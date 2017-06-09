import * as colorsObj from './colors'
const class2type = {}
const classList = 'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ')
const toString = class2type.toString
const hasOwn = class2type.hasOwnProperty
const userAgent = navigator.userAgent

let zIndex = 1000

classList.forEach(name => {
  class2type[ '[object ' + name + ']' ] = name.toLowerCase()
})

const colors = Object.keys(colorsObj)

const rclass = /[\t\r\n\f]/g
const rnotwhite = (/\S+/g)
const rmsPrefix = /^-ms-/
const rdashAlpha = /-([a-z])/g
const rcustomProp = /^--/
const rnative = /^[^{]+\{\s*\[native \w/
const cssPrefixes = ['Webkit', 'Moz', 'ms']
const pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source
const rcssNum = new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i')
const rnumnonpx = new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i')
const rmargin = /^margin/
// Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
const rdisplayswap = /^(none|table(?!-c[ea]).+)/
const emptyStyle = document.createElement('div').style
const cssProps = {
  float: 'cssFloat'
}
const cssNormalTransform = {
  letterSpacing: '0',
  fontWeight: '400'
}
const cssNumber = {
  animationIterationCount: true,
  columnCount: true,
  fillOpacity: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true
}

const finalPropName = (name) => {
  let ret = cssProps[name]
  if (!ret) {
    ret = cssProps[ name ] = vendorPropName(name) || name
  }
  return ret
}

const vendorPropName = (name) => {
  // Shortcut for names that are not vendor prefixed
  if (name in emptyStyle) {
    return name
  }

  // Check for vendor prefixed names
  let capName = name[0].toUpperCase() + name.slice(1)
  let i = cssPrefixes.length

  while (i--) {
    name = cssPrefixes[i] + capName
    if (name in emptyStyle) {
      return name
    }
  }
}

const cssExpand = [ 'Top', 'Right', 'Bottom', 'Left' ]

const setPositiveNumber = (elem, value, subtract) => {
  // Any relative (+/-) values have already been
  // normalized at this point
  var matches = rcssNum.exec(value)

  // Guard against undefined "subtract", e.g., when used as in cssHooks
  return matches
    ? Math.max(0, matches[2] - (subtract || 0)) + (matches[ 3 ] || 'px') : value
}

const augmentWidthOrHeight = (elem, name, extra, isBorderBox, styles) => {
  let i
  let val = 0

  // If we already have the right measurement, avoid augmentation
  if (extra === (isBorderBox ? 'border' : 'content')) {
    i = 4
  // Otherwise initialize for horizontal or vertical properties
  } else {
    i = name === 'width' ? 1 : 0
  }

  for (; i < 4; i += 2) {
    // Both box models exclude margin, so add it if we want it
    if (extra === 'margin') {
      val += _.css(elem, extra + cssExpand[i], true, styles)
    }

    if (isBorderBox) {
      // border-box includes padding, so remove it if we want content
      if (extra === 'content') {
        val -= _.css(elem, 'padding' + cssExpand[i], true, styles)
      }

      // At this point, extra isn't border nor margin, so remove border
      if (extra !== 'margin') {
        val -= _.css(elem, 'border' + cssExpand[i] + 'Width', true, styles)
      }
    } else {
      // At this point, extra isn't content, so add padding
      val += _.css(elem, 'padding' + cssExpand[i], true, styles)

      // At this point, extra isn't content nor padding, so add border
      if (extra !== 'padding') {
        val += _.css(elem, 'border' + cssExpand[i] + 'Width', true, styles)
      }
    }
  }
  return val
}

const getWidthOrHeight = (elem, name, extra) => {
  // Start with computed style
  let valueIsBorderBox
  let styles = getStyles(elem)
  let val = curCSS(elem, name, styles)
  let isBorderBox = _.css(elem, 'boxSizing', false, styles) === 'border-box'

  // Computed unit is not pixels. Stop here and return.
  if (rnumnonpx.test(val)) {
    return val
  }

  // Check for style in case a browser which returns unreliable values
  // for getComputedStyle silently falls back to the reliable elem.style
  valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[ name ])

  // Fall back to offsetWidth/Height when value is "auto"
  // This happens for inline elements with no explicit setting (gh-3571)
  if (val === 'auto') {
    val = elem['offset' + name[0].toUpperCase() + name.slice(1)]
  }

  // Normalize "", auto, and prepare for extra
  val = parseFloat(val) || 0

  // Use the active box-sizing model to add/subtract irrelevant styles
  return (val +
    augmentWidthOrHeight(
      elem,
      name,
      extra || (isBorderBox ? 'border' : 'content'),
      valueIsBorderBox,
      styles
    )
  ) + 'px'
}

const fcamelCase = (all, letter) => {
  return letter.toUpperCase()
}

const nodeName = (elem, name) => {
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
}

const swap = (elem, options, callback, args) => {
  let ret
  let name
  let old = {}

  // Remember the old values, and insert the new ones
  for (name in options) {
    old[ name ] = elem.style[ name ]
    elem.style[ name ] = options[ name ]
  }

  ret = callback.apply(elem, args || [])

  // Revert the old values
  for (name in options) {
    elem.style[name] = old[name]
  }

  return ret
}

const addGetHookIf = (conditionFn, hookFn) => {
  // Define the hook, we'll check on the first run if it's really needed.
  return {
    get () {
      if (conditionFn()) {
      // Hook not needed (or it's not possible to use it due
      // to missing dependency), remove it.
        delete this.get
        return
      }
      // Hook needed; redefine it so that the support test is not executed again.
      return (this.get = hookFn).apply(this, arguments)
    }
  }
}

const cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' }

const support = (() => {
  let documentElement = document.documentElement
  let pixelPositionVal
  let boxSizingReliableVal
  let pixelMarginRightVal
  let reliableMarginLeftVal
  let container = document.createElement('div')
  let div = document.createElement('div')
  let support = {}

  div.style.backgroundClip = 'content-box'
  div.cloneNode(true).style.backgroundClip = ''
  support.clearCloneStyle = div.style.backgroundClip === 'content-box'

  container.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;' +
    'padding:0;margin-top:1px;position:absolute'
  container.appendChild(div)

  let computeStyleTests = () => {
    if (!div) {
      return
    }
    // This is a singleton, we need to execute it only once
    div.style.cssText = 'box-sizing:border-box;' +
      'position:relative;display:block;' +
      'margin:auto;border:1px;padding:1px;' + 'top:1%;width:50%'
    div.innerHTML = ''
    documentElement.appendChild(container)

    let divStyle = window.getComputedStyle(div)
    pixelPositionVal = divStyle.top !== '1%'

    // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
    reliableMarginLeftVal = divStyle.marginLeft === '2px'
    boxSizingReliableVal = divStyle.width === '4px'

    // Support: Android 4.0 - 4.3 only
    // Some styles come back with percentage values, even though they shouldn't
    div.style.marginRight = '50%'
    pixelMarginRightVal = divStyle.marginRight === '4px'

    documentElement.removeChild(container)
    // Nullify the div so it wouldn't be stored in the memory and
    // it will also be a sign that checks already performed
    div = null
  }

  support['pixelPosition'] = () => {
    computeStyleTests()
    return pixelPositionVal
  }

  support['boxSizingReliable'] = () => {
    computeStyleTests()
    return boxSizingReliableVal
  }

  support['pixelMarginRight'] = () => {
    computeStyleTests()
    return pixelMarginRightVal
  }

  support['reliableMarginLeft'] = () => {
    computeStyleTests()
    return reliableMarginLeftVal
  }

  return support
})()

const adjustCSS = (elem, prop, valueParts, tween) => {
  let adjusted
  let scale = 1
  let maxIterations = 20
  let currentValue = tween ? () => {
    return tween.cur()
  } : () => {
    return _.css(elem, prop, '')
  }
  let initial = currentValue()
  let unit = valueParts && valueParts[ 3 ] || (cssNumber[prop] ? '' : 'px')

  // Starting value computation is required for potential unit mismatches
  let initialInUnit = (cssNumber[ prop ] || unit !== 'px' && +initial) && rcssNum.exec(_.css(elem, prop))

  if (initialInUnit && initialInUnit[ 3 ] !== unit) {
    // Trust units reported by jQuery.css
    unit = unit || initialInUnit[ 3 ]

    // Make sure we update the tween properties later on
    valueParts = valueParts || []

    // Iteratively approximate from a nonzero starting point
    initialInUnit = +initial || 1

    do {
      // If previous iteration zeroed out, double until we get *something*.
      // Use string for doubling so we don't accidentally see scale as unchanged below
      scale = scale || '.5'

      // Adjust and apply
      initialInUnit = initialInUnit / scale
      _.style(elem, prop, initialInUnit + unit)

    // Update scale, tolerating zero or NaN from tween.cur()
    // Break the loop if scale is unchanged or perfect, or if we've just had enough.
    } while (
      scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations
    )
  }

  if (valueParts) {
    initialInUnit = +initialInUnit || +initial || 0

    // Apply relative offset (+=/-=) if specified
    adjusted = valueParts[ 1 ] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2]
    if (tween) {
      tween.unit = unit
      tween.start = initialInUnit
      tween.end = adjusted
    }
  }
  return adjusted
}

const getStyles = (elem) => {
  // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
  // IE throws on elements created in popups
  // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
  var view = elem.ownerDocument.defaultView

  if (!view || !view.opener) {
    view = window
  }

  return view.getComputedStyle(elem)
}

const docElem = document.documentElement
// (http://www.w3school.com.cn/jsref/met_node_comparedocumentposition.asp)
// compareDocumentPosition(A, B)： 判断是否支持源生的节点比较方法，返回值比较奇葩

// contains(A, B)：判断A是否包含B，true/false(IE大大的方法，FF不支持)
const hasCompare = rnative.test(docElem.compareDocumentPosition)

const contains = hasCompare || rnative.test(docElem.contains)
  ? (a, b) => {
    let adown = a.nodeType === 9 ? a.documentElement : a
    let bup = b && b.parentNode
    return a === bup || !!(bup && bup.nodeType === 1 && (
      adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
    ))
  } : (a, b) => {
    if (b) {
      while ((b = b.parentNode)) {
        if (b === a) {
          return true
        }
      }
    }
    return false
  }

const curCSS = (elem, name, computed) => {
  let width
  let minWidth
  let maxWidth
  let ret

  // Support: Firefox 51+
  // Retrieving style before computed somehow
  // fixes an issue with getting wrong values
  // on detached elements
  let style = elem.style

  computed = computed || getStyles(elem)

  // getPropertyValue is needed for:
  //   .css('filter') (IE 9 only, #12537)
  //   .css('--customProperty) (#3144)
  if (computed) {
    ret = computed.getPropertyValue(name) || computed[name]

    if (ret === '' && !contains(elem.ownerDocument, elem)) {
      ret = _.style(elem, name)
    }

    // A tribute to the "awesome hack by Dean Edwards"
    // Android Browser returns percentage for some values,
    // but width seems to be reliably pixels.
    // This is against the CSSOM draft spec:
    // https://drafts.csswg.org/cssom/#resolved-values
    if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
      // Remember the original values
      width = style.width
      minWidth = style.minWidth
      maxWidth = style.maxWidth

      // Put in the new values to get a computed value out
      style.minWidth = style.maxWidth = style.width = ret
      ret = computed.width

      // Revert the changed values
      style.width = width
      style.minWidth = minWidth
      style.maxWidth = maxWidth
    }
  }
  // Support: IE <=9 - 11 only
  // IE returns zIndex value as an integer.
  return ret !== undefined ? ret + '' : ret
}

const cssHooks = {
  opacity: {
    get (elem, computed) {
      if (computed) {
        // We should always get a number back from opacity
        let ret = curCSS(elem, 'opacity')
        return ret === '' ? 1 : ret
      }
    }
  }
}

function transitionEnd () {
  let el = document.createElement('div')

  let transEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  }

  for (let name in transEndEventNames) {
    if (el.style[name] !== undefined) {
      return transEndEventNames[name]
    }
  }
}

function isArrayLike (obj) {
  let length = !!obj && 'length' in obj && obj.length
  let type = _.type(obj)

  if (type === 'function' || _.isWindow(obj)) {
    return false
  }

  return type === 'array' || length === 0 ||
    typeof length === 'number' && length > 0 && (length - 1) in obj
}

var access = (elems, fn, key, value, chainable, emptyGet, raw) => {
  let i = 0
  let len = elems.length
  let bulk = key == null

  // Sets many values
  if (_.type(key) === 'object') {
    chainable = true
    for (i in key) {
      access(elems, fn, i, key[ i ], true, emptyGet, raw)
    }

    // Sets one value
  } else if (value !== undefined) {
    chainable = true

    if (!_.isFunction(value)) {
      raw = true
    }

    if (bulk) {
      // Bulk operations run against the entire set
      if (raw) {
        fn.call(elems, value)
        fn = null
      // ...except when executing function values
      } else {
        bulk = fn
        fn = (elem, key, value) => {
          // return bulk.call(jQuery(elem), value)
        }
      }
    }

    if (fn) {
      for (; i < len; i++) {
        fn(elems[ i ], key, raw ? value : value.call(elems[ i ], i, fn(elems[ i ], key)))
      }
    }
  }

  if (chainable) {
    return elems
  }

  // Gets
  if (bulk) {
    return fn.call(elems)
  }

  return len ? fn(elems[ 0 ], key) : emptyGet
}

var _ = {
  addClass (el, value) {
    if (!el) return
    var classes
    var clazz
    var curr
    var i = 0
    var finalClass
    var _className = el.className
    if (_.type(value) === 'function') {
      return _.addClass(el, value.call(el, _className))
    }

    if (_.type(value) === 'string') {
      classes = (value || '').match(rnotwhite) || []
      curr = el.nodeType === 1 && _className ? (' ' + _className + ' ').replace(rclass, ' ') : ' '
      if (curr) {
        while ((clazz = classes[i++])) {
          if (el.classList) {
            el.classList.add(clazz)
          } else {
            if (curr.indexOf(' ' + clazz + ' ') < 0) {
              curr += clazz + ' '
            }
          }
        }

        if (!el.classList) {
          finalClass = curr.trim()
          if (finalClass !== _className) {
            el.className = finalClass
          }
        }
      }
    }
    return el
  },
  addEvent (elem, type, fn, capture) {
    if (elem && (elem.nodeType === 1 || elem.nodeType === 9 || _.isWindow(elem))) {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, !!capture)
      } else if (elem.attach) {
        elem.attach(type, fn)
      }
    }
  },
  camelCase (name) {
    return name.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase)
  },
  clone (...args) {
    return Object.assign({}, ...args)
  },
  cloneDeep () {
    var options
    var name
    var src
    var copy
    var copyIsArray
    var clone
    var target = arguments[0] || {}
    var i = 1
    var length = arguments.length
    var deep = false

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
      deep = target

      // Skip the boolean and the target
      target = arguments[i] || {}
      i++
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && !_.isFunction(target)) {
      target = {}
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = _
      i--
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) !== null) {
        // Extend the base object
        for (name in options) {
          src = target[name]
          copy = options[name]

          // Prevent never-ending loop
          if (target === copy) {
            continue
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (_.isPlainObject(copy) || (copyIsArray = _.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && _.isArray(src) ? src : []
            } else {
              clone = src && _.isPlainObject(src) ? src : {}
            }

            // Never move original objects, clone them
            target[ name ] = _.cloneDeep(deep, clone, copy)

          // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[ name ] = copy
          }
        }
      }
    }
    // Return the modified object
    return target
  },
  compareArray (arrA, arrB) {
    if (_.type(arrA) === 'array' && _.type(arrB) === 'array') {
      if (arrA.length === arrB.length) {
        let i = 0
        let length = arrA.length
        let result
        let itemA
        let itemB
        while (i < length) {
          itemA = arrA[i]
          itemB = arrB[i]
          if (typeof itemA === 'object' && typeof itemB === 'object') {
            result = _.compareObject(itemA, itemB)
            if (!result) {
              return false
            }
          } else {
            if (itemA !== itemB) { return false }
          }
          i++
        }
      } else {
        return false
      }
    } else {
      return false
    }
    return true
  },
  compareObject (objA, objB) {
    if (typeof objA === 'object' && typeof objB === 'object') {
      if (Object.keys(objA).length === Object.keys(objB).length) {
        let keys = Object.keys(objA)
        let itemA
        let itemB
        for (let i = 0, length = keys.length; i < length; i++) {
          itemA = objA[keys[i]]
          itemB = objB[keys[i]]
          if (_.type(itemA) === 'object' && _.type(itemB) === 'object') {
            if (!_.compareObject(itemA, itemB)) { return false }
          } else if (_.type(itemA) === 'array' && _.type(itemB) === 'array') {
            if (!_.compareArray(itemA, itemB)) { return false }
          } else {
            if (itemA !== itemB) { return false }
          }
        }
      } else {
        return false
      }
    } else {
      return false
    }
    return true
  },
  convertClass (classes) {
    let newClasses = []
    if (!classes) return newClasses
    if (_.type(classes) === 'array') {
      newClasses = newClasses.concat(classes)
    } else if (_.isPlainObject(classes)) {
      for (const name in classes) {
        if (classes[name]) newClasses.push(name)
      }
    } else {
      newClasses = newClasses.concat(classes.split(' '))
    }
    return newClasses
  },
  css (elem, name, extra, styles) {
    let val
    let num
    let hooks
    let origName = _.camelCase(name)
    let isCustomProp = rcustomProp.test(name)

    // Make sure that we're working with the right name. We don't
    // want to modify the value if it is a CSS custom property
    // since they are user-defined.
    if (!isCustomProp) {
      name = finalPropName(origName)
    }

    // Try prefixed name followed by the unprefixed name
    hooks = cssHooks[name] || cssHooks[ origName ]

    // If a hook was provided get the computed value from there
    if (hooks && 'get' in hooks) {
      val = hooks.get(elem, true, extra)
    }

    // Otherwise, if a way to get the computed value exists, use that
    if (val === undefined) {
      val = curCSS(elem, name, styles)
    }

    // Convert "normal" to computed value
    if (val === 'normal' && name in cssNormalTransform) {
      val = cssNormalTransform[name]
    }

    // Make numeric if forced or a qualifier was provided and val looks numeric
    if (extra === '' || extra) {
      num = parseFloat(val)
      return extra === true || isFinite(num) ? num || 0 : val
    }

    return val
  },
  dateConvert (str) {
    if (_.type(str) === 'string') {
      return str.split(' ')[0].substr(0, 4) + '-' + str.split(' ')[0].substr(4, 2) + '-' + str.split(' ')[0].substr(6, 2)
    }
    return '--'
  },
  dateConvert4 (str) {
    if (_.type(str) === 'string') {
      return str.substr(0, 4) + '年' + str.substr(4, 2) + '月' + str.substr(6, 2) + '日'
    }
    return false
  },
  dateFormatter (date = new Date(), format = 'YYYY-MM-dd') {
    if (date === '' || date === undefined) {
      return ''
    } else {
      let Map = {
        // 月(0-11,0代表1月)
        'M+': date.getMonth() + 1,
        // 日(1-31)
        'd+': date.getDate(),
        // 小时(0-12)
        'h+': date.getHours() % 12 || 12,
        // 小时(0-23)
        'H+': date.getHours(),
        // 分(0-59)
        'm+': date.getMinutes(),
        // 秒(0-59)
        's+': date.getSeconds(),
        // 毫秒(0-999)
        'S': date.getMilliseconds(),
        // 季度(1-4)
        'q+': Math.floor((date.getMonth() + 3) / 3)
      }

      // 0-6, 0代表星期天
      let week = ['日', '一', '二', '三', '四', '五', '六']
      // 年
      format = format.replace(/Y+/, (match) => (date.getFullYear() + '').substring(4 - match.length))
      // 星期
      format = format.replace(/E+/, (match) => {
        return (match.length > 1 ? (match.length > 2 ? '星期' : '周') : '') + week[date.getDay()]
      })

      let key
      let value
      for (key in Map) {
        value = Map[key]
        format = format.replace(new RegExp(key), (match) => match.length === 1 ? value : ('00' + value).substring((value + '').length))
      }
      return format
    }
  },
  debounce (callback, delay, immediate) {
    // immediate默认为false
    var timeout, args, context, timestamp, result

    var later = function () {
      // 当delay指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < delay && last >= 0一直为true，从而不断启动新的计时器延时执行func
      var last = _.now() - timestamp

      if (last < delay && last >= 0) {
        timeout = setTimeout(later, delay - last)
      } else {
        timeout = null
        if (!immediate) {
          result = callback.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function () {
      context = this
      args = arguments
      timestamp = _.now()
      // 第一次调用该方法时，且immediate为true，则调用func函数
      var callNow = immediate && !timeout
      // 在delay指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) timeout = setTimeout(later, delay)
      if (callNow) {
        result = callback.apply(context, args)
        context = args = null
      }

      return result
    }
  },
  each (obj, callback) {
    let length = 0
    let i = 0
    if (isArrayLike(obj)) {
      length = obj.length
      for (; i < length; i++) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break
        }
      }
    }
  },
  end: transitionEnd(),
  downloadFile (filename) {
    let old = document.getElementById('forDownload')
    if (old) {
      old.parentNode.removeChild(old)
    }
    let iframe = document.createElement('iframe')
    iframe.id = 'forDownload'
    iframe.style.display = 'none'
    iframe.src = '/atree/api/download?filename=' + filename
    document.getElementById('app').appendChild(iframe)
  },
  exist (obj) {
    if (_.type(obj) === 'string') {
      return obj.trim()
    } else if (_.type(obj) === 'number') {
      return true
    } else {
      return false
    }
  },
  getColumnById (table, columnId) {
    let column = null
    table.columns.forEach(item => {
      if (item.id === columnId) {
        column = item
      }
    })
    return column
  },
  getCell (event) {
    let cell = event.target

    while (cell && cell.tagName.toUpperCase() !== 'HTML') {
      if (cell.tagName.toUpperCase() === 'TD') {
        return cell
      }
      cell = cell.parentNode
    }

    return null
  },
  getColor (color) {
    if (!color) return ''
    return colors.indexOf(color) !== -1 ? colorsObj[color] : color
  },
  getColumnByCell (table, cell) {
    const matches = (cell.className || '').match(/el-table_[^\s]+/gm)
    if (matches) {
      return _.getColumnById(table, matches[0])
    }
    return null
  },
  getCookie (name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    var arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  getCurrStyle (obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr]
    } else {
      return document.defaultView.getComputedStyle(obj, null)[attr]
    }
  },
  getDOM (dom) {
    if (dom.nodeType === 3) {
      dom = dom.nextElementSibling || dom.nextSibling
      _.getDOM(dom)
    }
    return dom
  },
  /*
  * clientHeight = 高度 + padding
  * offsetHeight = 高度 + 滚动条 + padding + border
  * 当内部元素高度超出了外部元素高度时:
  * scrollHeight = 内部元素实际高度(content+padding+border+margin) + 父元素padding (firefox只包含padding-top)
  * 内部元素高度小于外部元素高度:
  * scrollHeight = 高度 + padding
  */
  getElementRect (element, margin = false) {
    let offsetHeight = element.offsetHeight
    let offsetWidth = element.offsetWidth
    if (margin) {
      let marginTop = parseFloat(_.getCurrStyle(element, 'margin-top'))
      let marginBottom = parseFloat(_.getCurrStyle(element, 'margin-bottom'))
      let marginLeft = parseFloat(_.getCurrStyle(element, 'margin-left'))
      let marginRight = parseFloat(_.getCurrStyle(element, 'margin-right'))
      offsetHeight = offsetHeight + marginTop + marginBottom
      offsetWidth = offsetWidth + marginLeft + marginRight
    }
    return {
      width: offsetWidth,
      height: offsetHeight
    }
  },
  getRowIdentity (row, rowKey) {
    if (!row) throw new Error('row is required when get row identity')
    if (typeof rowKey === 'string') {
      return row[rowKey]
    } else if (typeof rowKey === 'function') {
      return rowKey(row)
    }
  },
  getUniqId () {
    return new Date().getTime()
  },
  getValueByPath (object, prop) {
    prop = prop || ''
    const paths = prop.split('.')
    let current = object
    let result = null
    for (let i = 0, j = paths.length; i < j; i++) {
      const path = paths[i]
      if (!current) break

      if (i === j - 1) {
        result = current[path]
        break
      }
      current = current[path]
    }
    return result
  },
  getZIndex: () => zIndex++,
  hasClass (el, value) {
    if (!el) return
    var _className = el.className
    if (_.type(value) === 'function') {
      return _.hasClass(el, value.call(el, _className))
    }

    if (_.type(value) === 'string') {
      if (el.classList) {
        return el.classList.contains(value)
      } else {
        return (' ' + _className + ' ').indexOf(' ' + value + ' ') > -1
      }
    }
  },
  isArray (obj) {
    return _.type(obj) === 'array'
  },
  isFunction (obj) {
    return _.type(obj) === 'function'
  },
  isMobile () {
    return /(iPhone|iPod|Android|ios)/i.test(userAgent)
  },
  isPlainObject (obj) {
    var key

    // Not: null, undefined, element, window
    if (!obj || _.type(obj) !== 'object' || obj.nodeType || _.isWindow(obj)) {
      return false
    }

    try {
    // Not own constructor property must be Object
      if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false
      }
    } catch (e) {
    // IE8,9 Will throw exceptions on certain host objects #9897
      return false
    }

    // Support: IE<9
    // Handle iteration over inherited properties before own properties.
    // if (!support.ownFirst) {
    //   for (key in obj) {
    //     return hasOwn.call(obj, key)
    //   }
    // }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    for (key in obj) {}
    return key === undefined || hasOwn.call(obj, key)
  },
  isUndefined (obj) {
    return _.type(obj) === 'undefined'
  },
  isWindow (obj) {
    return obj !== null && obj !== undefined && obj === obj.window
  },
  notEmpty (obj) {
    var key
    if (_.isPlainObject(obj)) {
      for (key in obj) {}
    }
    return _.type(key) !== 'undefined'
  },
  notFalse (obj) {
    return !obj
  },
  now () {
    return +new Date()
  },
  numConvert (num, fixed, div) {
    num = parseFloat(num)
    var d = div || 10000
    if (!isNaN(num) && _.type(num) === 'number') {
      if (fixed) {
        return (num / d).toFixed(fixed)
      }
      return num / d
    }
    return '--'
  },
  offset (elem) {
    // Preserve chaining for setter

    let doc
    let docElem
    let rect
    let win

    if (!elem) {
      return
    }

    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
      return { top: 0, left: 0 }
    }

    rect = elem.getBoundingClientRect()

    doc = elem.ownerDocument
    docElem = doc.documentElement
    win = doc.defaultView

    return {
      top: rect.top + win.pageYOffset - docElem.clientTop,
      left: rect.left + win.pageXOffset - docElem.clientLeft
    }
  },
  offsetParent (elem) {
    var offsetParent = elem.offsetParent

    while (offsetParent && _.css(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.offsetParent
    }

    return offsetParent || document.documentElement
  },
  orderBy (array, sortKey, reverse, sortMethod) {
    if (typeof reverse === 'string') {
      reverse = reverse === 'descending' ? -1 : 1
    }
    if (!sortKey) {
      return array
    }
    const order = (reverse && reverse < 0) ? -1 : 1

    // sort on a copy to avoid mutating original array
    return array.slice().sort(sortMethod ? (a, b) => {
      return sortMethod(a, b) ? order : -order
    } : (a, b) => {
      if (sortKey !== '$key') {
        if (_.isPlainObject(a) && '$value' in a) a = a.$value
        if (_.isPlainObject(b) && '$value' in b) b = b.$value
      }
      a = _.isPlainObject(a) ? _.getValueByPath(a, sortKey) : a
      b = _.isPlainObject(b) ? _.getValueByPath(b, sortKey) : b
      return a === b ? 0 : a > b ? order : -order
    })
  },
  percentConvert (num) {
    num = parseFloat(num)
    if (!isNaN(num) && _.type(num) === 'number') {
      return (num / 100).toFixed(2) + '%'
    }
    return '--'
  },
  percentConvert2 (num) {
    num = parseFloat(num)
    if (!isNaN(num) && _.type(num) === 'number') {
      return (num * 100).toFixed(2) + '%'
    }
    return '--'
  },
  position (elem) {
    if (!elem) {
      return
    }

    let offsetParent
    let offset
    let parentOffset = { top: 0, left: 0 }

    // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
    // because it is its only offset parent
    if (_.css(elem, 'position') === 'fixed') {
      // Assume getBoundingClientRect is there when computed position is fixed
      offset = elem.getBoundingClientRect()
    } else {
      // Get *real* offsetParent
      offsetParent = _.offsetParent(elem)

      // Get correct offsets
      offset = _.offset(elem)
      if (!nodeName(offsetParent, 'html')) {
        parentOffset = _.offset(offsetParent)
      }

      // Add offsetParent borders
      parentOffset = {
        top: parentOffset.top + _.css(offsetParent[0], 'borderTopWidth', true),
        left: parentOffset.left + _.css(offsetParent[0], 'borderLeftWidth', true)
      }
    }

    // Subtract parent offsets and element margins
    return {
      top: offset.top - parentOffset.top - _.css(elem, 'marginTop', true),
      left: offset.left - parentOffset.left - _.css(elem, 'marginLeft', true)
    }
  },
  removeEvent (elem, type, fn, capture) {
    if (elem && (elem.nodeType === 1 || elem.nodeType === 9 || _.isWindow(elem))) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, fn, !!capture)
      } else if (elem.detach) {
        elem.detach(type, fn)
      }
    }
  },
  style (elem, name, value, extra) {
    // Don't set styles on text and comment nodes
    if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
      return
    }

    // Make sure that we're working with the right name
    let ret
    let type
    let hooks
    let origName = _.camelCase(name)
    let isCustomProp = rcustomProp.test(name)
    let style = elem.style

    // Make sure that we're working with the right name. We don't
    // want to query the value if it is a CSS custom property
    // since they are user-defined.
    if (!isCustomProp) {
      name = finalPropName(origName)
    }

    // Gets hook for the prefixed version, then unprefixed version
    hooks = cssHooks[name] || cssHooks[origName]

    // Check if we're setting a value
    if (value !== undefined) {
      type = typeof value

      // Convert "+=" or "-=" to relative numbers (#7345)
      if (type === 'string' && (ret = rcssNum.exec(value)) && ret[ 1 ]) {
        value = adjustCSS(elem, name, ret)

        // Fixes bug #9237
        type = 'number'
      }

      // Make sure that null and NaN values aren't set (#7116)
      if (value == null || isNaN(value)) {
        return
      }

      // If a number was passed in, add the unit (except for certain CSS properties)
      if (type === 'number') {
        value += ret && ret[3] || (cssNumber[origName] ? '' : 'px')
      }

      // background-* props affect original clone's values
      if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
        style[ name ] = 'inherit'
      }

      // If a hook was provided, use that value, otherwise just set the specified value
      if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
        if (isCustomProp) {
          style.setProperty(name, value)
        } else {
          style[ name ] = value
        }
      }
    } else {
      // If a hook was provided get the non-computed value from there
      if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
        return ret
      }

      // Otherwise just get the value from the style object
      return style[name]
    }
  },
  /*
   * @param callback {function}  需要调用的函数
   * @param delay  {number}    延迟时间，单位毫秒
   * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行\
   * @return {function}
  */
  throttle (callback, delay, options) {
    /* options的默认值
     *  表示首次调用返回值方法时，会马上调用callback；否则仅会记录当前时刻，当第二次调用的时间间隔超过delay时，才调用callback。
     *  options.leading = true;
     * 表示当调用方法时，未到达delay指定的时间间隔，则启动计时器延迟调用callback函数，若后续在既未达到delay指定的时间间隔和callback函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
     *  options.trailing = true;
     * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
     */
    var context, args, result
    var timeout = null
    var previous = 0
    if (!options) options = {}
    var later = function () {
      previous = options.leading === false ? 0 : _.now()
      timeout = null
      result = callback.apply(context, args)
      if (!timeout) context = args = null
    }
    return function () {
      var now = _.now()
      if (!previous && options.leading === false) previous = now
      // 计算剩余时间
      var remaining = delay - (now - previous)
      context = this
      args = arguments
      // 当到达delay指定的时间间隔，则调用callback函数
      // 精彩之处：按理来说remaining <= 0已经足够证明已经到达delay的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行callback函数。
      if (remaining <= 0 || remaining > delay) {
        // 由于setTimeout存在最小时间精度问题，因此会存在到达delay的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = callback.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        // options.trailing=true时，延时执行callback函数
        timeout = setTimeout(later, remaining)
      }
      return result
    }
  },
  removeClass (el, value) {
    if (!el) return
    var classes
    var curr
    var clazz
    var i = 0
    var finalClass
    var _className = el.className
    if (_.type(value) === 'function') {
      return _.removeClass(el, value.call(el, _className))
    }
    if (_.type(value) === 'string') {
      classes = (value || '').match(rnotwhite) || []
      curr = el.nodeType === 1 && _className ? (' ' + _className + ' ').replace(rclass, ' ') : ' '
      if (curr) {
        while ((clazz = classes[i++])) {
          if (el.classList) {
            el.classList.remove(clazz)
          } else {
            if (curr.indexOf(' ' + clazz + ' ') > -1) {
              curr = curr.replace(' ' + clazz + ' ', ' ')
            }
          }
        }

        if (!el.classList) {
          finalClass = curr.trim()
          if (finalClass !== _className) {
            el.className = finalClass
          }
        }
      }
    }
    return el
  },
  setCookie (name, value) {
    var Days = 365
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    var domain = ''
    if (/xinpibao\.com/.test(location.host)) {
      domain = 'domain=.xinpibao.com;'
    }
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/;' + domain
  },
  toParam (params) {
    let arr = []
    let value = null
    for (let key in params) {
      value = params[key]
      if (value !== 0 && !value) continue
      arr.push(key + '=' + (typeof value === 'object' ? encodeURIComponent(JSON.stringify(value)) : value))
    }
    return arr.length ? '?' + arr.join('&') : ''
  },
  type (obj) {
    if (obj === null || obj === undefined) {
      return obj + ''
    }
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[ toString.call(obj) ] || 'object' : typeof obj
  },
  formatnumber (value, num) {
    if (value === '--') {
      return
    }
    var a, b, c, i
    a = value.toString()
    b = a.indexOf('.')
    c = a.length
    if (num === 0) {
      if (b !== -1) {
        a = a.substring(0, b)
      }
    } else { // 如果没有小数点
      if (b === -1) {
        a = a + '.'
        for (i = 1; i <= num; i++) {
          a = a + '0'
        }
      } else { // 有小数点，超出位数自动截取，否则补0
        a = a.substring(0, b + num + 1)
        for (i = c; i <= b + num; i++) {
          a = a + '0'
        }
      }
    }
    return a
  }
}

_.each([ 'height', 'width' ], (i, name) => {
  cssHooks[name] = {
    get (elem, computed, extra) {
      if (computed) {
        // Certain elements can have dimension info if we invisibly show them
        // but it must have a current display style that would benefit
        return rdisplayswap.test(_.css(elem, 'display')) &&
        // Support: Safari 8+
        // Table columns in Safari have non-zero offsetWidth & zero
        // getBoundingClientRect().width unless display is changed.
        // Support: IE <=11 only
        // Running getBoundingClientRect on a disconnected node
        // in IE throws an error.
          (!elem.getClientRects().length || !elem.getBoundingClientRect().width)
            ? swap(elem, cssShow, () => {
              return getWidthOrHeight(elem, name, extra)
            }) : getWidthOrHeight(elem, name, extra)
      }
    },
    set (elem, value, extra) {
      let matches
      let styles = extra && getStyles(elem)
      let subtract = extra && augmentWidthOrHeight(
        elem,
        name,
        extra,
        _.css(elem, 'boxSizing', false, styles) === 'border-box',
        styles
      )

      // Convert to pixels if value adjustment is needed
      if (subtract && (matches = rcssNum.exec(value)) &&
        (matches[3] || 'px') !== 'px') {
        elem.style[ name ] = value
        value = _.css(elem, name)
      }
      return setPositiveNumber(elem, value, subtract)
    }
  }
})

cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, (elem, computed) => {
  if (computed) {
    return (parseFloat(curCSS(elem, 'marginLeft')) ||
      elem.getBoundingClientRect().left -
      swap(elem, {marginLeft: 0}, () => {
        return elem.getBoundingClientRect().left
      })
    ) + 'px'
  }
})

_.each({margin: '', padding: '', border: 'Width'}, (prefix, suffix) => {
  cssHooks[ prefix + suffix ] = {
    expand (value) {
      let i = 0
      let expanded = {}
      // Assumes a single number if not a string
      let parts = typeof value === 'string' ? value.split(' ') : [value]

      for (; i < 4; i++) {
        expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
      }

      return expanded
    }
  }

  if (!rmargin.test(prefix)) {
    cssHooks[ prefix + suffix ].set = setPositiveNumber
  }
})

_.each(['top', 'left'], (i, prop) => {
  cssHooks[ prop ] = addGetHookIf(support.pixelPosition,
  (elem, computed) => {
    if (computed) {
      computed = curCSS(elem, prop)

      // If curCSS returns percentage, fallback to offset
      return rnumnonpx.test(computed) ? _.position(elem)[prop] + 'px' : computed
    }
  }
  )
})

export default _
