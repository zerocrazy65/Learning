import './PicPost.css';

function PicPost(props){
    const {pic, offPic} = props;
    return(
        <div className="pic-post">
            <div className="pic-post-bg" onClick={offPic} />
            <div className="pic-post-content">
                <img src={pic.thumbnailUrl}></img>
                <h4>{pic.title}</h4>
            </div>
        </div>
    )
}
export default PicPost;