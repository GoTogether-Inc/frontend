import { useNavigate } from "react-router-dom";
import Header from "../../../../design-system/ui/Header";
import searchIcon from '../../../../design-system/icons/Search.svg';
import BottomBar from "../../../widgets/main/ui/BottomBar";
import EventCard from "../../../shared/ui/EventCard";
import { useBookmarks } from "../../../features/bookmark/model/useBookmarkHook";

const BookmarkPage = () => {
    const navigate = useNavigate();
    const { data } = useBookmarks();

    return (
        <div className="relative">
            <Header
                centerContent="관심 있는 이벤트"
                rightContent={
                    <button type="button" className="w-5 z-10" onClick={() => navigate('/search')}>
                        <img src={searchIcon} alt="Search Icon" />
                    </button>
                }
            />
            <div className="grid grid-cols-2 gap-4 mx-5 mt-3 md:grid-cols-2 lg:grid-cols-2 z-50">
                {data?.map(event => (
                    <EventCard
                        id={event.id}
                        key={event.id}
                        img={event.bannerImageUrl}
                        eventTitle={event.title}
                        dDay={event.remainDays}
                        host={event.hostChannelName}
                        eventDate={event.startDate}
                        location={event.onlineType}
                        hashtags={event.hashtags}
                    />
                ))}
            </div>
            <BottomBar />
        </div>
    );
}
export default BookmarkPage;