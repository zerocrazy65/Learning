import './PicItem.css';

function PicItem(props) {
    const {pic, onPic} = props;
    return (
        <div className="grid-item" >
            <img className="pic1size rounded-4" src={pic.thumbnailUrl} alt ="hi" onClick={() => {onPic(pic)}} />
            <h4>{pic.title}</h4>
        </div>
    )
}
export default PicItem;