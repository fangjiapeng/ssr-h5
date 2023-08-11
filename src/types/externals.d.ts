declare module '*.less' {
    const resource: { [key: string]: string };
    export = resource;
}
declare module 'isomorphic-style-loader/useStyles';
declare module 'isomorphic-style-loader/StyleContext';
declare module 'isomorphic-style-loader/withStyles';