import { FC, useState } from 'react';
import { TREATMENT } from 'apis/treatments';
import theme from 'components/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ContentWrapper, MainWrapper } from 'Style';
import handleToDateAndTime from 'containers/func/handleToDateAndTime';
import EarTagImage from 'images/ear.png';
import { destroyIndividual, INDIVIDUAL_SHOW_DATA } from 'apis/individuals';
import styled from 'styled-components';
import handleToDate from 'containers/func/handleToDate';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { breedTypeList, categoryList, sexList } from 'constant';
import DisplayTags from 'components/molecules/DisplayTags';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TagNum = styled.div`
  font-size: 22px;
  text-align: center;
  margin-left: 40%;
`;
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;
const RowTreatment = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Datetime = styled.p``;
const Data = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  line-height: 24px;
`;

const IndividualShow: FC<{ individual: INDIVIDUAL_SHOW_DATA }> = ({
  individual,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDestroy = () => {
    setOpen(false);
    destroyIndividual(individual.id ?? '')
      .then(() => {
        navigate('/individuals');
      })
      .catch(() => null);
  };
  const Sortedtreatments: TREATMENT[] | undefined = individual.treatments?.sort(
    (n1, n2) => {
      if (n1.datetime < n2.datetime) {
        return 1;
      }
      if (n1.datetime > n2.datetime) {
        return -1;
      }

      return 0;
    },
  );

  return (
    <>
      <MainWrapper>
        <TopRow>
          <TagNum>
            <img src={EarTagImage} alt="tag-number" width="20" />
            {individual.id?.slice(5, 9)}
          </TagNum>
          <TopRow>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={menuOpen ? 'long-menu' : undefined}
              aria-expanded={menuOpen ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem
                key="0"
                component={RouterLink}
                to={`/individuals/edit/${individual.id ?? ''}`}
              >
                ??????
              </MenuItem>
              <MenuItem key="1" onClick={handleClick}>
                ??????
              </MenuItem>
            </Menu>
          </TopRow>
        </TopRow>
        <Row>
          <p>?????????????????????</p>
          <Data>
            {individual.id?.slice(0, 5)}.
            <span style={{ fontWeight: 'bold' }}>
              {individual.id?.slice(5, 9)}
            </span>
            .{individual.id?.slice(9, 10)}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>????????????</p>
          <Data>
            {individual.dateOfBirth
              ? handleToDate(individual.dateOfBirth)
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>?????????</p>
          <Data>{individual.age}</Data>
        </Row>
        <Divider />
        <Row>
          <p>????????????</p>
          <Data>
            {individual.dateOfIntroduction
              ? handleToDate(individual.dateOfIntroduction)
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>?????????</p>
          <Data>
            {individual.sex != null ? sexList[individual.sex]?.label : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>?????????</p>
          <Data>
            {individual.category != null
              ? categoryList[individual.category]?.label
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>?????????</p>
          <Data>
            {individual.breedType != null
              ? breedTypeList[individual.breedType]?.label
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>?????????</p>
          <Data>
            {individual.areaName ?? '-'}
            {individual.barnName ?? '-'} {individual.no ?? ' '}
          </Data>
        </Row>
        <Divider />

        <Row>
          <p style={{ lineHeight: 2.5 }}>???????????????</p>
          <Data>
            <DisplayTags tags={individual.individualTags ?? []} />
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>??????????????????????????????</p>

          <Data>
            {individual.motherId ? (
              <Link
                component={RouterLink}
                to={`/individuals/${individual.motherId ?? '-'}`}
                style={{ fontSize: 16, color: 'black' }}
              >
                {individual.motherId?.slice(0, 5)}.
                <span style={{ fontWeight: 'bold' }}>
                  {individual.motherId?.slice(5, 9)}
                </span>
                .{individual.motherId?.slice(9, 10)}
              </Link>
            ) : (
              '-'
            )}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>??????</p>
          <Data>{individual.fatherName ? individual.fatherName : '-'}</Data>
        </Row>
        <Divider />
        <Row>
          <p>????????????</p>
          <Data>
            {individual.grandfatherName ? individual.grandfatherName : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>???????????????</p>
          <Data>
            {individual.grandGrandfatherName
              ? individual.grandGrandfatherName
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>?????????????????????</p>
          <Data>{individual?.treatments?.length}</Data>
        </Row>
        <Divider />
      </MainWrapper>
      {Sortedtreatments?.map((treatment: TREATMENT) => (
        <ThemeProvider theme={theme} key={treatment.id}>
          <ContentWrapper>
            <MainWrapper>
              <Link
                component={RouterLink}
                to={`/treatments/${treatment.id}`}
                style={{ fontSize: 16, color: 'black' }}
              >
                <RowTreatment>
                  <Datetime>
                    ?????????{handleToDateAndTime(treatment.datetime)}
                  </Datetime>
                  <p>
                    ?????????
                    {treatment.bodyTemperature.toFixed(1)}???
                  </p>
                </RowTreatment>
                <div className="row2">
                  <p>?????????{treatment.symptom}</p>
                  <p>???????????????{treatment.content}</p>
                </div>
                <div className="row3">
                  <p>????????????{treatment.userName}</p>
                </div>
              </Link>
            </MainWrapper>
          </ContentWrapper>
          <Divider />
        </ThemeProvider>
      ))}
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>???????????????????????????????????????</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>?????????</Button>
          <Button onClick={handleDestroy} autoFocus>
            ??????
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IndividualShow;
