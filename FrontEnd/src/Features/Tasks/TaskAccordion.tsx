import { Button, Accordion, AccordionControlProps, ActionIcon, Avatar, Center, Group, Paper, Text } from "@mantine/core";
import { IconFileShredder, IconEdit } from "@tabler/icons-react";
// import { fetchTasks, selectAllTasks } from "./TaskSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// import { getAllTasksQuery } from "./TaskSlice";
// import { useQuery } from "@apollo/client";
// import Symbol_observable from 'symbol-observable';


const charactersList = [
  {
    id: "bender",
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "Bender Bending Rodríguez",
    description: "Fascinated with cooking, though has no sense of taste",
    content: "Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.",
  },

  {
    id: "carol",
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Carol Miller",
    description: "One of the richest people on Earth",
    content: "Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.",
  },

  {
    id: "homer",
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Homer Simpson",
    description: "Overweight, lazy, and often ignorant",
    content: "Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.",
  },
];

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}

function AccordionLabel({ label, image, description }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

function AccordionControl(props: AccordionControlProps) {
  return (
    <Center>
      <Accordion.Control {...props} />
      <ActionIcon size='lg' variant="subtle" color="gray" onClick={() => { console.log("Delete Clicked") }}>
        <IconFileShredder size='1rem' />
      </ActionIcon>
      <ActionIcon size='lg' variant="subtle" color="gray" onClick={() => { console.log("Edit Clicked") }}>
        <IconEdit size='1rem' />
      </ActionIcon>
    </Center>
  )
}

export default function TaskAcc() {
  const items = charactersList.map(item => (
    <Accordion.Item value={item.id} key={item.label}>
      <AccordionControl>
        <AccordionLabel {...item} />
      </AccordionControl>
      <Accordion.Panel>
        <Text size="sm">{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper shadow="xl" radius="lg" withBorder p="xl" style={{ width: '50rem' }}>
        <Accordion variant="Contained" radius="lg" chevronPosition="right">
          {items}
        </Accordion>
      </Paper>
      <Button variant='outline'>Refresh</Button>
    </div>
  );
}

