import React from "react";
import styled from "styled-components";

import { theme } from "../theme";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;

  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${theme.color.darkGrey};

  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 10px;

  &:hover {
    background: linear-gradient(to right, #3ec7e0, #526bf4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function DiscoverLinks() {
  const links = [
    {
      name: "Scorcese's foreign film list",
      link: "https://i.imgur.com/2yDXgqN.jpg"
    },
    {
      name: "BFI 100 greatest films ever",
      link: "https://www.bfi.org.uk/greatest-films-all-time"
    },
    {
      name: "Bradshaw's best of 2010-2015",
      link:
        "https://www.theguardian.com/film/2015/jan/05/top-50-films-of-the-demi-decade-peter-bradshaw"
    },
    {
      name: "Reddit top 250",
      link:
        "https://letterboxd.com/les_vampires/list/reddit-r-movies-top-250-2019-edition/"
    },
    {
      name: "Kermode's best of 2019",
      link:
        "https://www.theguardian.com/film/2019/dec/29/mark-kermode-best-films-of-2019"
    },
    {
      name: "IMDB top 250",
      link: "https://www.imdb.com/chart/top/"
    }
  ];

  return (
    <Container>
      {links.map(l => (
        <Link
          href={l.link}
          target="_blank"
          rel="noopener noreferrer"
          key={l.name}
        >
          {l.name}
        </Link>
      ))}
    </Container>
  );
}

export default DiscoverLinks;
