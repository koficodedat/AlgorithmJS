export interface UniNode<T>{
    item: T;
    next: UniNode<T>;
}

export interface BiNode<T>{
    item: T;
    next: UniNode<T>;
    previous: UniNode<T>;
}

export interface TreeNode<V>{
    key: number | string;
    value: V;
    left: TreeNode<V>;
    right: TreeNode<V>;
    size: number;
}
