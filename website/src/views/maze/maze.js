import { color_diff } from './color'

class Node {
  constructor (x, y, value) {
    this.x = x
    this.y = y
    this.value = value
    this.cost = 0
    this.beginDistance = 0
    this.endDistance = 0
    this.checked = false
    this.parent = null
  }
}

class Cell {
  constructor (x, y, value) {
    this.x = x
    this.y = y
    this.value = value
    this.checked = false
  }
}

class Area {
  constructor (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}

class MazeGanerator {
  static 上 = 0b1000
  static 左 = 0b0100
  static 下 = 0b0010
  static 右 = 0b0001

  /**
   * 
   * @param {Number} width 
   * @param {Number} height 
   */
  constructor (width, height, cellSize) {
    this.width = width
    this.height = height
    this.cellSize = cellSize
    this.cellBorder = 1
    this.nodes = new Array(width * height)
    this.nodesChecked = []
    this.areas = []
    this.gaps = []
  }

  async createWall (cb = async () => {}) {
    let { width, height } = this
    let areas = this.areas = [ new Area(0, 0, width, height) ]

    for (;;) {
      let index = areas.findIndex(area => area.width > 1 || area.height > 1)
      
      if (index >= 0) {
        let area = areas[index]
        let [ areaA, areaB ] = this.splitArea(area)

        areas.splice(index, 1)
        areas.push(areaA)
        areas.push(areaB)

        await cb()
      } else {
        break
      }
    }
  }

  splitArea (area) {
    let { x, y, width, height } = area
    let xA, xB, yA, yB, widthA, widthB, heightA, heightB // A、B 是两个分裂后的区域

    if ( width > height) { // 竖切
      let splitLength = this.getRandomInt(1, width - 1) // 随机切割
      
      xA = x
      yA = y
      widthA = splitLength
      heightA = height

      xB = x + splitLength
      yB = y
      widthB = width - splitLength
      heightB = height

      let yRandom = this.getRandomInt(y, y + height - 1)
      let gap = { x: xB, y: yRandom, direction: 'horizontal' }
      this.gaps.push(gap)
    } else { // 横切
      let splitLength = this.getRandomInt(1, height - 1) // 随机切割

      xA = x
      yA = y
      widthA = width
      heightA = splitLength

      xB = x
      yB = y + splitLength
      widthB = width
      heightB = height - splitLength

      let xRandom = this.getRandomInt(x, x + width - 1)
      let gap = { x: xRandom, y: yB, direction: 'vertical' }
      this.gaps.push(gap)
    }

    let areaA = new Area(xA, yA, widthA, heightA)
    let areaB = new Area(xB, yB, widthB, heightB)

    return [ areaA, areaB ]
  }

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   */
   renderAreasCanvas (canvas) {
    let { areas, gaps, width, height, cellSize, cellBorder } = this

    canvas.width = width * cellSize
    canvas.height = height * cellSize
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let area of areas) {
      let { x, y, width, height, gap } = area

      // 通过画两个大小矩形达到画出边框的效果
      ctx.fillStyle = "#000000"
      ctx.fillRect(x * cellSize, y * cellSize, width * cellSize, height * cellSize)
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(x * cellSize + cellBorder, y * cellSize + cellBorder, width * cellSize - cellBorder * 2, height * cellSize - cellBorder * 2)
    }

    for (let gap of gaps) {
      // 画出缺口
      ctx.fillStyle = "#FFFFFF"
      if (gap.direction === 'vertical') {
        ctx.fillRect(gap.x * cellSize + cellBorder, gap.y * cellSize - cellBorder, cellSize - cellBorder * 2, cellBorder * 2)
      } else if (gap.direction === 'horizontal') {
        ctx.fillRect(gap.x * cellSize - cellBorder, gap.y * cellSize + cellBorder, cellBorder * 2, cellSize - cellBorder * 2)
      }
    }
  }

  build () {
    let { nodes } = this
    let { length } = nodes

    for (let i = 0; i < length; i++) {
      let { x, y } = this.indexToPos(i)
      nodes[i] = new Cell(x, y, 0b1111) // 4个bit代表上下左右墙壁的开闭状态，0：开，1：闭
    }
  }

  /**
   * 破墙循环
   * @param {Function} cb 
   */
  async breakWall (cb = async () => {}) {
    let { nodes, nodesChecked } = this

    nodesChecked.push(nodes[0])
    nodes[0].checked = true

    let current = nodes[0]

    for (; nodesChecked.length > 0;) {
      let breakDirection = this.getRandomNext(current)

      await cb(current)

      if (breakDirection !== null) {
        current.value ^= breakDirection.value

        let { nextNode } = breakDirection
        nextNode.value ^= breakDirection.oppositeValue
        nextNode.checked = true

        nodesChecked.push(nextNode)
        current = nextNode
      } else {
        current = nodesChecked.pop()
      }
    }
  }

  /**
   * 对数组进行洗牌
   * @param {Array} array 
   * @returns 
   */
  shuffle (array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  /**
   * 获取周围可以破的墙
   * @param {Cell} node 
   * @returns 
   */
  getNextDirections (node) {
    const { 上, 左, 下, 右 } = MazeGanerator
    let { x, y, value } = node

    return [ 上, 左, 下, 右 ]
    .filter(direction => (value & direction) === direction)
    .map(direction => {
      let nextX
      let nextY
      let oppositeValue
  
      if (direction === 上) {
        oppositeValue = 下
        nextX = x
        nextY = y - 1
      } else if (direction === 左) {
        oppositeValue = 右
        nextX = x - 1
        nextY = y
      } else if (direction === 下) {
        oppositeValue = 上
        nextX = x
        nextY = y + 1
      } else if (direction === 右) {
        oppositeValue = 左
        nextX = x + 1
        nextY = y
      }
      
      // 边界判断
      if (nextX >= 0 && nextY >= 0 && nextX < this.width && nextY < this.height) {
        let nextNode = this.nodes[this.posToIndex(nextX, nextY)]
        return { x: nextX, y: nextY, value: direction, oppositeValue, nextNode }
      } else {
        return null
      }
    })
    .filter(item => item !== null && item.nextNode.checked === false)
  }

  /**
   * 随机获取周围可以破的墙
   * @param {Cell} node 
   * @returns 
   */
  getRandomNext (node) {
    let nextDirections = this.getNextDirections(node)

    if (nextDirections.length > 0) {
      let nextDirection = nextDirections[this.getRandomInt(0, nextDirections.length - 1)]
  
      return {
        nextNode: nextDirection.nextNode,
        value: nextDirection.value,
        oppositeValue: nextDirection.oppositeValue
      }
    } else {
      return null
    }
  }

  /**
   * 范围取随机数
   * @param {Number} min 
   * @param {Number} max 
   * @returns 
   */
  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {Cell} node
   */
  renderCanvas (canvas, current) {
    const { 上, 左, 下, 右 } = MazeGanerator
    let { nodes, width, height, cellSize, cellBorder } = this
    let { length } = nodes
    
    canvas.width = width * cellSize
    canvas.height = height * cellSize
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < length; i++) {
      let node = nodes[i]
      let { x, y, value } = node
      let leftTopX = x * cellSize
      let leftTopY = y * cellSize

      // 开始画边框
      ctx.beginPath()
      ctx.lineWidth = cellBorder

      if ((value & 上) === 上) {
        ctx.moveTo(leftTopX, leftTopY)
        ctx.lineTo(leftTopX + cellSize,  leftTopY)
      }
      if ((value & 左) === 左) {
        ctx.moveTo(leftTopX, leftTopY)
        ctx.lineTo(leftTopX,  leftTopY + cellSize)
      }
      if ((value & 下) === 下) {
        ctx.moveTo(leftTopX, leftTopY + cellSize)
        ctx.lineTo(leftTopX + cellSize,  leftTopY + cellSize)
      }
      if ((value & 右) === 右) {
        ctx.moveTo(leftTopX + cellSize, leftTopY)
        ctx.lineTo(leftTopX + cellSize,  leftTopY + cellSize)
      }

      ctx.closePath()
      ctx.strokeStyle = '#000000'
      ctx.stroke()

      if (this.nodesChecked.indexOf(node) >= 0) {
        let w = cellBorder
        ctx.fillStyle = '#74b9ff'
        ctx.fillRect(leftTopX + w, leftTopY + w, cellSize - w * 2, cellSize - w * 2)
      }

      if (node === current) {
        let w = cellBorder
        ctx.fillStyle = '#fd79a8'
        ctx.fillRect(leftTopX + w, leftTopY + w, cellSize - w * 2, cellSize - w * 2)
      }
    }
  }

  indexToPos (i) {
    let x = i % this.width
    let y = Math.floor(i / this.width)
    return { x, y }
  }

  posToIndex (x, y) {
    return y * this.width + x
  }
}

class NodeGraph {
  constructor (matrix, width, height, beginPos, endPos) {
    this.nodes = []
    this.matrix = matrix
    this.width = width
    this.height = height

    this.queue = new Heap((a, b) => {
      if (a.cost > b.cost) {
        return 1
      } else if (a.cost < b.cost) {
        return -1
      } else {
        return 0
      }
    })
    this.current = null
    
    this.beginPos = beginPos
    this.beginNode = null
    this.endPos = endPos
    this.endNode = null
  }

  buildNodeGraph () {
    let { width, height, beginPos, endPos } = this

    this.nodes = new Array(width * height)

    // 先处理 begin end
    this.beginNode = this.getNode(beginPos[0], beginPos[1])
    this.endNode = this.getNode(endPos[0], endPos[1])
  }

  getNode (x, y) {
    let { nodes, width, height, matrix } = this
    if (x >= 0 && y >= 0 && x < width && y < height) {
      let node = nodes[y * width + x]
      if (node === undefined) {
        let value = matrix[y * width + x]
        node = new Node(x, y, value)
        nodes[y * width + x] = node
      }
      return node
    } else {
      return null
    }
  }

  getNearNodes (node) {
    let { x, y } = node
    let up = this.getNode(x, y - 1)
    let down = this.getNode(x, y + 1)
    let left = this.getNode(x - 1, y)
    let right = this.getNode(x + 1, y)
    return [ up, down, left, right ].filter(node => node !== null)
  }

  popBestNextNode () {
    return this.queue.pop()
  }

  switchNodeValue (node) {
    node.value = !node.value
  }

  setEndNode (node) {
    for (let node of this.nodes) {
      node.checked = false
      node.parent = null
    }
    this.queue = this.current.nearNodes.filter(node => node.value)
    this.endNode = node
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function buildPath (endNode) {
  let path = []
  let node = endNode

  while (node !== null) {
    path.push(node)
    node = node.parent
  }

  return path
}

function equalsNode (a, b) {
  return a.x === b.x && a.y === b.y
}

function getDistance (nodeA, nodeB) {
  const x = Math.abs(nodeB.x - nodeA.x)
  const y = Math.abs(nodeB.y - nodeA.y)
  return (x + y)
}

/**
 * 获取 Node 的 RGB 值
 * @param {Node} node 
 * @returns 
 */
function getNodeRGB (node) {
  let { value } = node
  let r = value & 0xFF
  let g = value >> 8 & 0xFF
  let b = value >> 16 & 0xFF
  return [ r, g, b ]
}

/**
 * 求两个节点的颜色差距
 * @param {Node} nodeA 
 * @param {Node} nodeB 
 * @returns 
 */
function getNodeColorDiff (nodeA, nodeB) {
  let rgbA = getNodeRGB(nodeA)
  let rgbB = getNodeRGB(nodeB)

  return color_diff(rgbA, rgbB)
}

async function solveMaze (matrix, width, height, begin, end, mode, cb = () => {}) {
  let path = []
  let nodeGraph = new NodeGraph(matrix, width, height, begin, end)
  nodeGraph.buildNodeGraph()
  
  nodeGraph.queue.push(nodeGraph.beginNode)

  while (nodeGraph.queue.length) {
    let current = nodeGraph.current = nodeGraph.popBestNextNode()
    current.checked = true

    let exit = await cb(nodeGraph, current, [], false)
    if (exit) { return }

    if (equalsNode(current, nodeGraph.endNode)) {
      path = buildPath(current)
      await cb(nodeGraph, current, path, true)
      return path
    }

    let nearNodes = nodeGraph.getNearNodes(current)
    for (let i = nearNodes.length - 1; i >= 0; i--) {
      let node = nearNodes[i]
      if (node.checked === false) {
        node.checked = true

        let colordiff = getNodeColorDiff(node, current)
        const colorDiffThreshold = 2 // 容许通过的颜色差异，范围 0~100

        node.parent = current
        node.endDistance = getDistance(node, nodeGraph.endNode)
        node.beginDistance = current.beginDistance + 1

        if (mode === "1") {
          node.cost = node.endDistance + node.beginDistance
        
          if (colordiff < colorDiffThreshold) {
            nodeGraph.queue.push(node)
          }
        } else if (mode === "2") {
          node.cost = node.endDistance + node.beginDistance + (colordiff * width * height)
          nodeGraph.queue.push(node)
        }
      }
    }
  }

  return path
}

export {
  MazeGanerator,
  solveMaze
}