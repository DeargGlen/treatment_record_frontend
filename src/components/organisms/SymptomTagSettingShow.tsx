import { FC, useState } from 'react';
import { ListItem, ListItemText, Button, Divider } from '@mui/material';
import {
  SYMPTOM_TAG_DATA,
  SymptomTagOptionType,
  destroySymptomTag,
} from 'apis/symptomtags';
import AlertMessage from 'components/molecules/AlertMessage';

const SymptomTagSettingShow: FC<{
  tags: SymptomTagOptionType[];
  changedCount: number;
  setChangedCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ tags, changedCount, setChangedCount }) => {
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const submitDestroySymptomTag = (tagId: number) => {
    destroySymptomTag(tagId)
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
      <div style={{ fontSize: 24, textAlign: 'center' }}>症状タグの削除</div>

      <Divider />
      {tags.map((tag: SymptomTagOptionType) => (
        <div key={tag.id}>
          <ListItem sx={{ height: 49 }}>
            <ListItemText>{tag.name}</ListItemText>
            <Button
              variant="contained"
              color="primary"
              onClick={() => submitDestroySymptomTag(tag.id ?? 0)}
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

export default SymptomTagSettingShow;
