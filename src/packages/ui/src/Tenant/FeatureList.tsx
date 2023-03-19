import { Tab } from "@headlessui/react";
import { useFeatures } from "@abpreact/hooks";
import { FeatureGroupDto } from "@abpreact/proxy";

export type FeatureListProps = {};

export const FeatureList = ({}: FeatureListProps) => {
  var { data } = useFeatures("T", undefined);
  return (
    <Tab.Group>
      <Tab.List>
        {data?.groups?.map((el: FeatureGroupDto, index: number) => (
          <Tab key={index}>{el.displayName}</Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {data?.groups?.map((el: FeatureGroupDto, index: number) => (
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
