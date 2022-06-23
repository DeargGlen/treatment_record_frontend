import { FC } from 'react';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { medicineTypeList } from 'constant/index';

type Tags = {
  id: number;
  name: string;
  medicineTagId: number;
  amount: number;
  amountType: number;
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DisplayMedicine: FC<{ tags: Tags[] }> = ({ tags }) => {
  const navigate = useNavigate();
  const handleClick = (tag: Tags) => {
    navigate('/treatments', { state: { setMedicineTagId: tag.id } });
  };

  return (
    <>
      {tags?.map((tag) => (
        <Row key={tag.id}>
          <Chip
            label={tag.name}
            variant="outlined"
            onClick={() => handleClick(tag)}
          />
          <div style={{ lineHeight: 2 }}>
            {tag.amount}
            {tag.amountType != null
              ? medicineTypeList[tag.amountType]?.label
              : '-'}
          </div>
        </Row>
      ))}
    </>
  );
};

export default DisplayMedicine;
