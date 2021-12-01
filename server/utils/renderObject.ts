import serialize from 'serialize-javascript';

const renderObject = (data: unknown): string => serialize(data).replace(/</g, '\\\u003c') as string;

export default renderObject;
