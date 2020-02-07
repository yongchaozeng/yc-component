import React from 'react'
// child是否是parent的子元素
export function isChildOf(child: React.ReactNode, parent: React.ReactNode) {
    var parentNode;
    if (child && parent) {
        parentNode = (child as HTMLElement).parentNode;
        while (parentNode) {
            if (parent === parentNode) {
                return true;
            }
            parentNode = parentNode.parentNode;
        }
    }
    return false;
}