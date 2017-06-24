export interface UniNode<T>{
    item: T;
    next: UniNode<T>;
}

export interface BiNode<T>{
    item: T;
    next: UniNode<T>;
    previous: UniNode<T>;
}

export interface TreeNode<T>{
    key: number | string;
    value: T;
    left: TreeNode<T>;
    right: TreeNode<T>;
    size: number;
}
