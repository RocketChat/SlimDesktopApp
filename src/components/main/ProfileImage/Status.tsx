import styled from "styled-components";
import { UserStatus } from "../../../interfaces/user";


const handleStatusTypeColor = (userStatus: UserStatus)  => {
    switch (userStatus) {
      case UserStatus.BUSY:
        return "#ff4b4b"; // Red
    case UserStatus.ONLINE:
        return "#2de0a5"; // Green
    case UserStatus.OFFLINE:
        return "#c1c1c1"; // Light Grey
    case UserStatus.AWAY:
        return "#ffba65"; // Yellow
    default:
        return "#c1c1c1";
    }
};

export default styled.span`
    height: 0.75rem;
    width: 0.75rem;
    background-color: ${(props: any) => handleStatusTypeColor(props.userStatus)};
    background-size: contain;
    display: inline-block;
    ${(props: {profileImage: boolean}) => props.profileImage ? `
        position: relative;
        bottom: 17.5px;
        left: 23.5px;
    ` : ``}
    border-radius: 50%;
    border: 1px solid;
`
