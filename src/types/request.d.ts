

//request 的类型声明文件
declare module 'request' {
    interface Request {
        (): Promise<any>
    }
    function post(url: string, options: any, callback?: any): void
    function get(url: string, options: any, callback?: any): void
    function get(url: string, callback: any): void
    function post(url: string, callback: any): void
    export { post, get }
    const request: Request
    export default request
}

