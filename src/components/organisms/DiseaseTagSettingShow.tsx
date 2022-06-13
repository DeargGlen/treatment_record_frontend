import { FC, useState } from 'react';
import { ListItem, ListItemText, Button, Divider } from '@mui/material';
import {
  DISEASE_TAG_DATA,
  DiseaseTagOptionType,
  destroyDiseaseTag,
} from 'apis/diseasetags';
import AlertMessage from 'components/molecules/AlertMessage';

const DiseaseTagSettingShow: FC<{
  tags: DiseaseTagOptionType[];
  changedCount: number;
  setChangedCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ tags, changedCount, setChangedCount }) => {
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const submitDestroyDiseaseTag = (tagId: number) => {
    destroyDiseaseTag(tagId)
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
      <div style={{ fontSize: 24, textAlign: 'center' }}>疾病タグの削除</div>

      <Divider />
      {tags.map((tag: DiseaseTagOptionType) => (
        <div key={tag.id}>
          <ListItem sx={{ height: 49 }}>
            <ListItemText>{tag.name}</ListItemText>
            <Button
              variant="contained"
              color="primary"
              onClick={() => submitDestroyDiseaseTag(tag.id ?? 0)}
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

export default DiseaseTagSettingShow;
