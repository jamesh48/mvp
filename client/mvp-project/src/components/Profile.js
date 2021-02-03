import parse from 'html-react-parser';

const Profile = (props) => {
    return props.profile ? parse(props.profile) : null;
}
export default Profile;