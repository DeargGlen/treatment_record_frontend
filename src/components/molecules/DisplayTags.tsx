import { FC } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

type Tags = {
  id: number;
  name: string;
  symptomTagId?: number;
  diseaseTagId?: number;
};

const DisplayTags: FC<{ tags: Tags[] }> = ({ tags }) => {
  const navigate = useNavigate();
  const handleClick = (tag: Tags) => {
    if (tag.symptomTagId) {
      console.log('s');
      navigate('/treatments', { state: { setSymptomTagId: tag.id } });
    }
    if (tag.diseaseTagId) {
      console.log('d');
      navigate('/treatments', { state: { setDiseaseTagId: tag.id } });
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {tags?.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          variant="outlined"
          onClick={() => handleClick(tag)}
        />
      ))}
    </Stack>
  );
};

export default DisplayTags;
