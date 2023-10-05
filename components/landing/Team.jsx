import Slider from "react-slick";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Box, Stack, Typography } from "@mui/material";
import { Colors } from "@/styles/theme/theme";
import {
  Dot,
  DotContainer,
  LeftArrowContainer,
  RightArrowContainer,
} from "@/styles/LandingPage";
import { useState } from "react";

const teams = [
  {
    image: "/images/team1.jpg",
    name: "Airi Satou",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate qui eum, quibusdam mollitia quos aspernatur quam debitis cum adipisci quo maxime vel, ipsa iste voluptates repudiandae quasi voluptatum eveniet",
  },
  {
    image: "/images/team2.jpg",
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate qui eum, quibusdam mollitia quos aspernatur quam debitis cum adipisci quo maxime vel, ipsa iste voluptates repudiandae quasi voluptatum eveniet",
  },
  {
    image: "/images/team3.jpg",
    name: "Ashton Cox",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate qui eum, quibusdam mollitia quos aspernatur quam debitis cum adipisci quo maxime vel, ipsa iste voluptates repudiandae quasi voluptatum eveniet",
  },
  {
    image: "/images/team4.jpeg",
    name: "Jacob Ryan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate qui eum, quibusdam mollitia quos aspernatur quam debitis cum adipisci quo maxime vel, ipsa iste voluptates repudiandae quasi voluptatum eveniet",
  },
  {
    image: "/images/team5.jpg",
    name: "Angelica Ramos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate qui eum, quibusdam mollitia quos aspernatur quam debitis cum adipisci quo maxime vel, ipsa iste voluptates repudiandae quasi voluptatum eveniet",
  },
];

const Team = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const PrevArrow = ({ onClick }) => {
    return (
      <LeftArrowContainer onClick={onClick}>
        <MdChevronLeft size={24} />
      </LeftArrowContainer>
    );
  };

  const afterChangeHandler = (currentSlide) => {
    setActiveSlide(currentSlide);
  };

  const NextArrow = ({ onClick }) => {
    return (
      <RightArrowContainer onClick={onClick}>
        <MdChevronRight size={24} />
      </RightArrowContainer>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    afterChange: afterChangeHandler,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => <Box>{dots}</Box>,
    customPaging: (i) => {
      return (
        <DotContainer
          bgcolor={i == activeSlide ? Colors.primary : Colors.white}
        />
      );
    },
  };

  return (
    <>
      <Typography textAlign="center" fontSize={32} fontWeight={700} fontStyle="italic">
        Our Team
      </Typography>
      <Typography
        fontSize={18}
        color="rgba(0, 0, 0, 0.87)"
        marginTop={1}
        marginBottom={6}
        textAlign="center"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sequi
        illum, fugiat optio fuga itaque adipisci. Odio facere tempora expedita.
      </Typography>
      <Box maxWidth="600px" width="100%" margin="20px auto">
        <Slider {...settings} className="slider">
          {teams.map((team, index) => {
            return (
              <Box
                key={index}
                textAlign="center"
                position="relative"
                border={`1px solid ${Colors.warning}`}
                padding={2}
                borderRadius={4}
              >
                <Stack direction="row" alignItems="center">
                  <Box width="80px" height="80px" borderRadius="50%">
                    <img
                      src={team.image}
                      alt="team"
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  </Box>
                  <Typography marginLeft={2} fontWeight={500}>
                    {team.name} - fugiat optio fuga itaque
                  </Typography>
                </Stack>

                <Typography
                  color="rgba(0, 0, 0, 0.7)"
                  marginTop={2}
                  letterSpacing={1}
                  fontSize={14}
                >
                  {team.description}
                </Typography>
              </Box>
            );
          })}
        </Slider>
      </Box>
    </>
  );
};

export default Team;
