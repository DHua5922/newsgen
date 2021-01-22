import ReactLoading from 'react-loading';

export function Loader({ type, color, height, width }) {
    return (
        <ReactLoading 
            type={type ? type : 'spin'} 
            color={color ? color : 'black'} 
            height={height ? height : '5%'} 
            width={width ? width : '5%'} 
        />
    );
}