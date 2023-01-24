import { DirectoryItemContainer, BackgroundImage, Body } from "./directory-item.style";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({category}) => {

    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    const navigationHandeler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={navigationHandeler}>
            <BackgroundImage imageUrl={imageUrl}/>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}
export default DirectoryItem;