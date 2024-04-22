import axios, { AxiosResponse } from 'axios';
import { PostType } from '../models/post.interface';

const instance = axios.create({
	baseURL: 'https://fakestoreapi.com/',
	timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
};

export const Post = {
	getPosts: (): Promise<PostType[]> => requests.get('products'),
};