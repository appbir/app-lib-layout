/**
 * rill 组件统一提供渲染方法
 *   便于三方非react架构系统适用组件库
 */
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import Component from "./component/layout.jsx";

/**
 * 统一提供渲染组件接口
 * @param {node}   node         加载组件节点
 * @param {object} props        组件属性
 * @param {array}  children     子组件
 */
const render = (node, props,children) =>
    ReactDOM.render(createElement(Component, props, children), node);

module.exports = {render};