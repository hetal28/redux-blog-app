import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({timeStamp}) => {
    let timeAgo = ''
    let timePeriod = 0
    if(timeStamp){
        const date = parseISO(timeStamp)
        timePeriod = formatDistanceToNow(date)
        timeAgo = `$(timePeriod) ago`
    }
    return ( 
        <span title={timeStamp}>
            &nbsp; <i>{timePeriod} ago</i>
        </span>
     );
}
 
export default TimeAgo;