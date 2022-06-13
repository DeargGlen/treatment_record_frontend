import { FC, useState } from 'react';
import { ListItem, ListItemText, Button, Divider } from '@mui/material';
import {
  INDIVIDUAL_TAG_DATA,
  IndividualTagOptionType,
  destroyIndividualTag,
} from 'apis/individualtags';
import AlertMessage from 'components/molecules/AlertMessage';

const IndividualTagSettingShow: FC<{
  tags: IndividualTagOptionType[];
  changedCount: number;
  setChangedCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ tags, changedCount, setChangedCount }) => {
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const submitDestroyIndividualTag = (tagId: number) => {
    destroyIndividualTag(tagId)
      .then(() => {
        setChangedCount(changedCount + 1);
      })
      .catch((e) => {
        setAlertMessageOpen(true);
        console.log(e);
      });
  };

  return (
    <>
      <div style={{ fontSize: 24, textAlign: 'center' }}>個体タグの削除</div>

      <Divider />
      {tags.map((tag: IndividualTagOptionType) => (
        <div key={tag.id}>
          <ListItem sx={{ height: 49 }}>
            <ListItemText>{tag.name}</ListItemText>
            <Button
              variant="contained"
              color="primary"
              onClick={() => submitDestroyIndividualTag(tag.id ?? 0)}
            >
              削除
            </Button>
          </ListItem>
          <Divider />
        </div>
      ))}
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="削除できません。使われているタグです。"
      />
    </>
  );
};

export default IndividualTagSettingShow;
