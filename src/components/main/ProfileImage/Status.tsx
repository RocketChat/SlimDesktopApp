import styled from "styled-components";
import { UserStatus } from "../../../interfaces/user";
import awaySvg from "./StatusImages/away.svg";
import busySvg from "./StatusImages/busy.svg";


const handleStatusTypeColor = (userStatus: UserStatus)  => {
    switch (userStatus) {
      case UserStatus.BUSY:
        return "none"; // Red
    case UserStatus.ONLINE:
        return "#2de0a5"; // Green
    case UserStatus.OFFLINE:
        return "#c1c1c1"; // Light Grey
    case UserStatus.AWAY:
        return "none"; // Yellow
    default:
        return "#c1c1c1";
    }
};

const handleStatusBackgroundImage = (userStatus: UserStatus)  => {
    switch (userStatus) {
      case UserStatus.BUSY:
        return `url("${busySvg}")`; // Red
    case UserStatus.AWAY:
        return `url("${awaySvg}")`; // Red
    default:
        return "none";
    }
};

export default styled.span`
    height: 0.75rem;
    width: 0.75rem;
    background-color: ${(props: any) => handleStatusTypeColor(props.userStatus)};
    background-image: ${(props: any) => handleStatusBackgroundImage(props.userStatus)};
    background-size: contain;
    display: inline-block;
    ${(props: {profileImage: boolean}) => props.profileImage ? `
        position: relative;
        bottom: 17.5px;
        left: 23.5px;
    ` : ``}
    border-radius: 50%;
`
