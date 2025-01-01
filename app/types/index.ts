import { JSXElementConstructor, ReactElement } from "react";
import { Key } from "readline";

export interface SharedText {
    id: string;
    content: string;
    createdAt: Date;
}

export interface UserModel {
    id: number,
    name: string,
}
export interface PostModel {
    id: number,
    title: string,
    keyword: string,
    des: string,
    slug: string,
    image: string,
    publish: number,
    content: string,
    created_at: string
    user: UserModel,
    deletePost: (id: number) => void;
}
export interface PostAddModel {
    title: string,
    content: string
}

export interface SharedTextItems {
    id: string;
    text: string;
    url: string;
}