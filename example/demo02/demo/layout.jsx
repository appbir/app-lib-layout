/**
 *  该布局适合整站布局
 *  ---------------------
 *  如果想局部布局，则可以使用auto 或者diy模式 (TODO 该两种模式还未完全成熟)
 * 
 *  局部布局需要使用style传递对应的miniheight 最小高度  或者使用样式覆盖
 * 
 *  有必要场景可扩展排序规则
 */

import PropTypes from 'prop-types';
import React from 'react';

/**
 * FULL: full layout include priority
 * AUTO: 100%  按照外层百分比进行
 * DIY : define you width or height
 */
export const POSITION = { FULL: 'FULL', AUTO: 'AUTO', 'DIY': 'DIY' }

const PARTS = {
    // 最外层容器 最大容器
    MAIN_CONTAINER: 'main_container',
    // 辅助左右布局容器
    LEFT_RIGHT_CONTAINER: 'left_right_container',
    // 过度容器 
    LEFT_CONTAINER: 'left_container',
    RIGHT_CONTAINER: 'right_container',
    BOTTOM_CONTAINER: 'bottom_container',
    // 内容区域容器
    CONTENT_CONTAINER: 'content-container',
    // 组成部分
    HEADER: 'header',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    CONTENT: 'content',
    CONTENT_HEADER: 'content_header',
}


// 元素节点排序 
const ORDER = [PARTS.CONTENT, PARTS.HEADER, PARTS.LEFT, PARTS.RIGHT, PARTS.BOTTOM, PARTS.CONTENT_HEADER];

const getChildren = (current, opt, array) => {
    let id = current[opt.keyFiled];
    let childEle = [];
    array.map(item => {
        if (item[opt.parentFiled] === id) {
            childEle.push(item);
        }
    });
    childEle.length && childEle.map(ele => {
        ele[opt.childFiled] = getChildren(ele, opt, array);
    })
    return childEle;
}

export const arrayToTree = (array, option) => {
    if (!array || !array.length) return (option && (option.returnType === 'object')) ? {} : [];
    let opt = { parentFiled: 'parent', keyFiled: 'id', childFiled: 'children', returnType: 'tree' };
    typeof option === 'string' ? (opt.parentFiled = option) : (opt = { ...opt, ...option });
    let temp = {}, first = [];
    array.map(obj => (temp[obj[opt.keyFiled]] = obj));
    array.map(current => {
        let parent = current[opt.parentFiled];
        if (!parent || !temp[parent]) {
            first.push(current);
        }
    })
    first && first.map(firstChild => {
        firstChild[opt.childFiled] = getChildren(firstChild, opt, array);
    });
    return opt.returnType === 'object' ? temp : first;
}

// 是否合法的参数
const isLegal = size => size && !POSITION[size] && /px/.test(size);

// 像素计算
const add = (first, second) => isLegal(second) ? (parseInt((first || '0').split('px')[0]) + parseInt((second || '0').split('px')[0]) + 'px') : first

// 是否整合
const isIntegrate = (size, isWidth) => isWidth ? [PARTS.LEFT, PARTS.RIGHT].indexOf(size) != -1 : [PARTS.HEADER, PARTS.BOTTOM].indexOf(size) != -1


// 计算宽度或高度
const integrate = (integration, part, name) => {
    isIntegrate(name) && (integration.height = add(integration.height, part.height));
    isIntegrate(name, true) && (integration.width = add(integration.width, part.width));
}

// 是否满屏
const isFull = (name, config, isHeight) => {
    return (config[name] || false) &&
        (isHeight ? config[name].height === POSITION.FULL : config[name].width === POSITION.FULL)
}


const Layout = ({ classNamePrefix = 'appbir-layout-', targetName = 'targetName', config = {}, children, style = {}, model = POSITION.FULL }) => {
    // 是否为全屏模式
    let isFullModel = model === POSITION.FULL;
    let cfg = {};
    for (let name in config) {
        let partCfg = config[name];
        partCfg.visiabled && (cfg[name] = partCfg)
    }

    /**
     * 根据模型 返回固定位置类型
     */
    const getFixedPosition = () => {
        return model !== POSITION.FULL ? 'absolute' : 'fixed';
    }

    // 计算样式
    const calcStyle = config => {
        let styles = [];
        // 记录宽度和高度
        let integration = {
            width: '',
            height: '',
        }
        // 是否为纵向布局
        let mainIsRow = !isFull(PARTS.HEADER, cfg) ?
            (isFull(PARTS.LEFT, cfg, true) + isFull(PARTS.RIGHT, cfg, true)) ? true : false : false;
        // ------------------------------main conrainer--------------------------------------
        let mainStyle = {
            // 1: tips 如果指定宽度  则flex 在overflow后会出现横向的滚动条
            // 2: tips 如果指定高度  则超出宽度不会被布局
            minHeight: '100vh',
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: mainIsRow ? 'row' : 'column',
            position: model == POSITION.FULL ? 'static' : 'relative',
            ...style // 支持自定义样式
        };

        // 非全屏模式不设置制动
        if(!isFullModel){
            mainStyle.minHeight = '0px'
        }

        styles.push({ name: PARTS.MAIN_CONTAINER, style: mainStyle, parent: null });

        // 指针节点
        let parentNode = PARTS.MAIN_CONTAINER;

        // ------------------------------left_right conrainer--------------------------------------
        let mainNode = PARTS.MAIN_CONTAINER;
        let rightNode = '';
        let leftNode = '';
        let isLeft = false;
        let isTop = false;
        let isRight = cfg[PARTS.RIGHT] && cfg[PARTS.RIGHT].fixed && cfg[PARTS.RIGHT].width;


        let headerConfig = cfg[PARTS.HEADER];
        let rightConfig = cfg[PARTS.RIGHT];
        let leftConfig = cfg[PARTS.LEFT];

        if (mainIsRow) {
            parentNode = PARTS.LEFT_RIGHT_CONTAINER;
            let leftRightContainerStyle = {
                flex: 1,
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
            };

            if (leftConfig && leftConfig.fixed && leftConfig.width) {
                if (leftConfig.height != POSITION.FULL && rightConfig && (rightConfig.height === POSITION.FULL)) {
                } else {
                    leftRightContainerStyle.marginLeft = leftConfig.width;
                    isLeft = true;
                }
            }

            styles.push({ name: PARTS.LEFT_RIGHT_CONTAINER, parent: PARTS.MAIN_CONTAINER, style: leftRightContainerStyle })
        }


        let bottomNode = parentNode;

        // ------------------------------header--------------------------------------
        if (headerConfig) {
            let headerStyle = {
                flex: '0 0 ' + headerConfig.height,
                order: -1,
            };

            if (headerConfig.fixed) {
                headerStyle = {
                    position: getFixedPosition(),
                    width: '100%',
                    zIndex: headerConfig.zIndex,
                    height: headerConfig.height
                }
                integrate(integration, headerConfig, PARTS.HEADER);
            }
            styles.push({ name: PARTS.HEADER, parent: parentNode, style: headerStyle })
        }


        // ------------------------------left or right conrainer--------------------------------------
        if (cfg[PARTS.LEFT] || cfg[PARTS.RIGHT]) {
            if (mainIsRow && isFull(PARTS.LEFT, cfg, true) && isFull(PARTS.RIGHT, cfg, true)) {
                rightNode = mainNode;
                leftNode = mainNode;
            } else {
                let containerStyle = {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                }

                if (integration.height) {
                    containerStyle.marginTop = integration.height;
                    isTop = true;
                }
                styles.push({ name: PARTS.LEFT_CONTAINER, parent: parentNode, style: containerStyle })
                rightNode = mainIsRow && isFull(PARTS.RIGHT, cfg, true) ? mainNode : PARTS.LEFT_CONTAINER;
                leftNode = mainIsRow && isFull(PARTS.LEFT, cfg, true) ? mainNode : PARTS.LEFT_CONTAINER;
                parentNode = PARTS.LEFT_CONTAINER;
            }
        }


        // ------------------------------left--------------------------------------

        if (leftConfig) {
            let leftStyle = {
                flex: ' 0 0 ' + leftConfig.width,
                order: -1
            };
            if (leftConfig.fixed) {
                leftStyle = {
                    position: getFixedPosition(),
                    width: leftConfig.width,
                    height: '100%',
                    zIndex: leftConfig.zIndex
                }
                integrate(integration, leftConfig, PARTS.LEFT);
            }

            if ((isFull(PARTS.LEFT, cfg, true) + isFull(PARTS.RIGHT, cfg, true) === 1) && cfg[PARTS.BOTTOM] && cfg[PARTS.RIGHT] && cfg[PARTS.LEFT]) {
                if (!isFull(PARTS.LEFT, cfg, true)) {
                    if (isFull(PARTS.HEADER, cfg)) {
                        leftNode = PARTS.BOTTOM_CONTAINER;
                    }
                }
            }

            let lNode = leftNode || ((mainIsRow && isFull(PARTS.LEFT, cfg, true)) ? PARTS.MAIN_CONTAINER : parentNode);
            styles.push({ name: PARTS.LEFT, parent: lNode, style: leftStyle })
        }

        //   ------------------------------right conrainer--------------------------------------
        if ((isFull(PARTS.LEFT, cfg, true) + isFull(PARTS.RIGHT, cfg, true) === 1) && cfg[PARTS.BOTTOM] && cfg[PARTS.RIGHT] && cfg[PARTS.LEFT]) {
            let rightContainerStyle = {
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            };
            if (!mainIsRow && integration.width) {
                rightContainerStyle.marginLeft = integration.width;
                isLeft = true;
            }
            styles.push({ name: PARTS.RIGHT_CONTAINER, parent: parentNode, style: rightContainerStyle })
            parentNode = PARTS.RIGHT_CONTAINER;
        }




        // ------------------------------bottom conrainer--------------------------------------
        if (isFull(PARTS.HEADER, cfg) && (isFull(PARTS.LEFT, cfg, true) + isFull(PARTS.RIGHT, cfg, true) === 1)
            && cfg[PARTS.BOTTOM] && cfg[PARTS.RIGHT]) {
            let bContainerStyle = {
                display: 'flex',
                flexDirection: 'row',
                flex: '1'
            }
            styles.push({ name: PARTS.BOTTOM_CONTAINER, parent: parentNode, style: bContainerStyle })
            if (!isFull(PARTS.RIGHT, cfg, true)) {
                rightNode = PARTS.BOTTOM_CONTAINER;
            }
            bottomNode = parentNode;
            parentNode = PARTS.BOTTOM_CONTAINER;
        }

        let contentNode = parentNode;

        // ------------------------------content and content container--------------------------------------
        let isContentHeader = false;
        let content_headerConfig = cfg[PARTS.CONTENT_HEADER];
        if (content_headerConfig) {
            contentNode = PARTS.CONTENT_CONTAINER;
            let cContainerStyle = {
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1',
                position: 'relative'
            }
            if (!isLeft && integration.width) {
                cContainerStyle.marginLeft = integration.width;
                isLeft = true;
            }
            if (!isTop && integration.height) {
                cContainerStyle.marginTop = integration.height;
                isTop = true;
            }

            if (isFull(PARTS.LEFT, cfg, true)) {
                if (isFull(PARTS.RIGHT, cfg, true) || !cfg[PARTS.RIGHT]) {
                    bottomNode = contentNode;
                }

            }

            if (isRight) {
                cContainerStyle.marginRight = isRight;
                isRight = false;
            }

            styles.push({ name: PARTS.CONTENT_CONTAINER, parent: parentNode, style: cContainerStyle })

            let content_headerStyle = {
                flex: '0 0 ' + content_headerConfig.height
            };
            if (content_headerConfig.fixed) {
                // let calcWidth = add(leftConfig && leftConfig.width,rightConfig && rightConfig.width) || '0px';
                content_headerStyle = {
                    // width:'calc(100vw - '+ calcWidth +')',
                    width: '100%',
                    height: content_headerConfig.height,
                    position: getFixedPosition(),
                    zIndex: content_headerConfig.zIndex
                }
                isContentHeader = content_headerConfig.height;
            }
            styles.push({ name: PARTS.CONTENT_HEADER, parent: contentNode, style: content_headerStyle })
        }


        // ------------------------------content--------------------------------------
        let contentConfig = cfg[PARTS.CONTENT];
        if (contentConfig) {
            let contentStyle = { flex: 1 };
            if (!isLeft && integration.width) {
                contentStyle.marginLeft = integration.width;
            }
            if (isContentHeader) {
                contentStyle.marginTop = isContentHeader;
            }
            if (!isTop && integration.height) {
                contentStyle.marginTop = integration.height;
            }
            if (isRight) {
                contentStyle.marginRight = isRight;
                isRight = false;
            }
            styles.push({ name: PARTS.CONTENT, parent: contentNode, style: contentStyle })
        }


        // ------------------------------right--------------------------------------
        if (rightConfig) {
            let rightStyle = {
                flex: ' 0 0 ' + rightConfig.width,
                order: 1
            };
            if (rightConfig.fixed) {
                rightStyle = {
                    position: getFixedPosition(),
                    width: rightConfig.width,
                    zIndex: rightConfig.zIndex,
                    height: '100%',
                    right: 0
                }

                if (content_headerConfig && content_headerConfig.fixed) {
                    if (content_headerConfig.width === POSITION.FULL && rightConfig.height != POSITION.FULL) {
                        rightStyle.marginTop = content_headerConfig.height;
                    }
                }
            }

            let rNode = rightNode || parentNode;
            styles.push({ name: PARTS.RIGHT, parent: rNode, style: rightStyle })
        }


        // ------------------------------bottom--------------------------------------
        let bottomConfig = cfg[PARTS.BOTTOM];
        if (bottomConfig) {
            let bottomStyle = {
                flex: ' 0 0 ' + bottomConfig.height,
                order: 1
            };
            if (bottomConfig.fixed) {
                bottomStyle = {
                    position: getFixedPosition(),
                    width: '100%',
                    zIndex: bottomConfig.zIndex,
                    height: bottomConfig.height,
                    bottom: 0
                }
            }
            if (bottomNode === mainNode && integration.width) {
                if (!isFull(PARTS.BOTTOM, cfg) && isFullModel) { // 非全屏情况
                    bottomStyle.marginLeft = integration.width;
                }
            }
            styles.push({ name: PARTS.BOTTOM, parent: bottomNode, style: bottomStyle })
        }
        return arrayToTree(styles, { keyFiled: 'name' });
    }

    // 转换子节点到树
    const childrenToTree = (children, name) => {
        let tree = {};
        if (!children) return tree;
        if (!Array.isArray(children)) { // 兼容react单个子元素是对象
            children = [children];
        }
        children.map((child, index) => {
            let tName = child.props[name] || ORDER[index];
            tree[tName] = child;
        });
        return tree;
    }

    const createPart = (config, child, childrenMap) =>
        <div key={config.name}
            style={config.style}
            className={classNamePrefix + config.name}>
            {child || childrenMap[config.name]}
        </div>

    const createDom = (styleTree, childrenMap, cfg) => {
        if (!styleTree || !styleTree.length) return null;
        let dom = [];
        styleTree.map((config) => {
            let child = config.children && config.children.length && createDom(config.children, childrenMap, cfg)
            let partDom = createPart(config, child, childrenMap);
            dom.push(partDom);
        })
        return dom;
    }

    let childrenMap = childrenToTree(children, targetName);
    let styleTree = calcStyle(cfg);
    return createDom(styleTree, childrenMap, cfg)
}

Layout.PropTypes = {
    classNamePrefix: PropTypes.string,
    targetName: PropTypes.string,
    config: PropTypes.object
}

export default Layout;
