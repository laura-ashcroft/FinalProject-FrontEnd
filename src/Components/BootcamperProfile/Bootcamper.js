//Config
import { url } from "../../config";

//React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Components
import UserInfo from "../UserInfo/userinfo";
import UserSkills from "../UserSkills/userskills";
import UserIntro from "../UserIntro/userintro";
import UserJourney from "../UserJourney/journey";
import Loading from "../Loading/loading";

//Style
import style from "../UserProfile/profile.module.css";
import cn from "classnames";

export default function BootcamperProfilePage() {
  const [journey, setJourney] = useState();
  const [userData, setUserData] = useState();
  const [bootcamper, setBootcamper] = useState();

  const { id } = useParams();

  useEffect(() => {
    async function getUser() {
      if (id) {
        let res = await fetch(`${url}/users/?id=${id}`);
        let data = await res.json();
        const user = data.payload[0];

        setUserData(user);
      }
    }
    getUser();
  }, [id]);

  useEffect(() => {
    async function getUserJourney() {
      if (userData) {
        let res = await fetch(`${url}/journeys/?id=${id}`);
        let data = await res.json();
        setJourney(data.payload);
      }
    }
    getUserJourney();
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const newUser = {
        uid: userData.id,
        username: `${userData.name} ${userData.surname}`,
        email: userData.email,
        profileImage: userData.profileimage,
        admin: userData.admin,
        cohort: userData.cohort,
        currentRole: userData.currentrole,
        currentEmployer: userData.currentemployer,
        skills: userData.skills,
        social: userData.social,
        introduction: userData.introduction,
        journey: journey ? journey : null,
      };
      setBootcamper(newUser);
    }
  }, [userData && journey]);

  return (
    <div className="marginTop">
      {bootcamper ? (
        <div className={cn(style.row)}>
          {/* ---Column Left--- */}
          <div className={cn(style.column, style.leftProfile)}>
            <UserInfo user={bootcamper} />
            <UserSkills user={bootcamper} />
          </div>
          {/* ---Column Right--- */}
          <div className={cn(style.column, style.right)}>
            <UserIntro user={bootcamper} />
            <UserJourney user={bootcamper} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
