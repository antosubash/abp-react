import { Tab } from "@headlessui/react";
import { useFeatures } from "hooks/useFeatures";
import React from "react";

type Props = {};

const FeatureList = (props: Props) => {
  var { data } = useFeatures("T", undefined);
  console.log(data);
  return (
    <Tab.Group>
      <Tab.List>
        {data?.groups?.map((el, index) => (
          <Tab key={index}>{el.displayName}</Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {data?.groups?.map((el, index) => (
          <Tab.Panel key={index}>
              {el.features?.map((feature, index) => (
                <div key={index}>{feature.displayName}</div>
              ))}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default FeatureList;
