import { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import axios from "axios";
import { Accordion, Container, Title } from "@mantine/core";

interface DataType {
  id: number;
  title: string;
}

interface ChildType {
  id: number;
  answer: string;
  question: string;
}

export default function Faq() {
  const [active, setActive] = useState(1);

  const [data, setData] = useState<DataType[]>([]);
  const [child, setChild] = useState<ChildType[]>([]);

  const fetchChildren = async (id: number) => {
    const url = `/api/v1/faq?categoryId=${id}&source=ecustoms`;
    const res = await axios.get(url);
    setChild(res.data.data);
  };

  useEffect(() => {
    const url = "/api/v1/faq?source=ecustoms";
    axios.get(url).then((res) => setData(res.data.data));

    const url2 = "/api/v1/faq?categoryId=1&source=ecustoms";
    axios.get(url2).then((res) => setChild(res.data.data));
  }, []);

  const links = data.map((item) => (
    <div
      className={classes.link}
      data-active={item.id === active || undefined}
      key={item.title}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.id);
        fetchChildren(item.id);
      }}
    >
      <span>{item.title}</span>
    </div>
  ));

  return (
    <section className="container">
      <div className={classes.box}>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>{links}</div>
        </nav>

        <Container className={classes.wrapper}>
          <Title ta="center" className={classes.title}>
            Tez-tez verilən suallar
          </Title>

          <Accordion variant="separated">
            {child.map((item) => (
              <Accordion.Item
                key={item.id}
                className={classes.item}
                value={item.question}
              >
                <Accordion.Control>{item.question}</Accordion.Control>
                <Accordion.Panel className={classes.answer}>
                  {item.answer}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </div>
    </section>
  );
}
