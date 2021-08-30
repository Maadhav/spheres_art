/**
 * @class Shimmer
 */

 import React, { Component } from 'react'
 import PropTypes from 'prop-types'
 
 import './style.css';
 export default class Shimmer extends Component {
   static propTypes = {
     className: PropTypes.string,
     height: PropTypes.string,
   }
 
   render() {
     const {
       className,
       height
     } = this.props
     let class_name=(className ? className:"")+" loading-shimmer loading-shimmer-animation";
     return (
        <span className={class_name}></span>
     )
   }
 }