import sharafi from "../../public/images/amirhossein-sharafi.jpg";
import karami from "../../public/images/amirreza-karami.jpg";
import ganji from "../../public/images/ali-ganjizade.png";
import Card from "../components/Card/Card";
import FixedSidebar from "../components/Fixed-Sidebar/FixedSidebar";

export default function aboutUs() {
  const data = [
    {
      id: 1,
      name: "امیرحسین شرفی",
      image: sharafi,
      position: "Front End Developer",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    },
    {
      id: 2,
      name: "امیررضا کرمی",
      image: karami,
      position: "Front End Developer",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    },
    {
      id: 3,
      name: "علی گنجی زاده",
      image: ganji,
      position: "Back End Developer",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    },
  ];
  return (
    <>
      <FixedSidebar/>
      <div className="h-screen flex flex-col md:flex-row p-4">
        {data.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
