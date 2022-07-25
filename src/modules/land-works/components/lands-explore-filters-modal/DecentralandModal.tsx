import React, { useEffect, useState } from 'react';
import { ModalProps, SliderThumb, Typography } from '@mui/material';

import { Button, Grid, Input, Modal, RadioButton, StyledSwitch } from 'design-system';

import {
  ButtonRow,
  CheckboxContainer,
  StyledGrid,
  StyledRoot,
  StyledSlider,
  StyledSubtitle,
  StyledTitle,
} from './styled';

import { landTypes } from 'modules/land-works/constants';

import { MoreFiltersType } from './types';

const disabled = {
  opacity: '0.5',
  pointerEvents: 'none',
};

type Props = ModalProps & {
  handleSubmit: (value: Partial<MoreFiltersType>) => void;
  onCancel: () => void;
  maxLandSize: number;
};

export const DecentralandFiltersModal: React.FC<Props> = (props) => {
  const MAX_DISTANCE = 9;
  const { onCancel, handleSubmit, maxLandSize, ...modalProps } = props;
  const [selectedType, setSelectedType] = useState<number>(0);
  const [minSize, setMinSize] = useState<number>(1);
  const [maxSize, setMaxSize] = useState<number>(maxLandSize || 10);
  const [minDistanceToPlaza, setMinDistanceToPlaza] = useState<number>(1);
  const [maxDistanceToPlaza, setMaxDistanceToPlaza] = useState<number>(MAX_DISTANCE);
  const [minDistanceToRoad, setMinDistanceToRoad] = useState<number>(1);
  const [maxDistanceToRoad, setMaxDistanceToRoad] = useState<number>(MAX_DISTANCE);
  const [minDistanceToDistrict, setMinDistanceToDistrict] = useState<number>(1);
  const [maxDistanceToDistrict, setMaxDistanceToDistrict] = useState<number>(MAX_DISTANCE);
  const [isDisableSize, setIsDisableSize] = useState(true);
  const [isDisabledDistanceToPlaza, setIsDisabledDistanceToPlaza] = useState(true);
  const [isDisabledDistanceToRoad, setIsDisabledDistanceToRoad] = useState(true);
  const [isDisabledDistanceToDistrict, setIsDisabledDistanceToDistrict] = useState(true);

  const typeHandler = (value: number) => {
    setSelectedType(value);
    const isAllSelected = value === 0;
    const isEstateSelected = value === 2;

    if (isAllSelected) {
      resetAll();
    } else {
      isEstateSelected && setIsDisabledDistanceToRoad(true);
      isEstateSelected ? setIsDisableSize(false) : setIsDisableSize(true);
    }
  };

  const sizeHandler = (event: Event, value: number | Array<number>, activeThumb: number) => {
    if (Array.isArray(value)) {
      if (activeThumb === 0) {
        setMinSize(value[activeThumb]);
      } else {
        setMaxSize(value[activeThumb]);
      }
    }
  };

  const distanceToPlazaHandler = (event: Event, value: number | Array<number>, activeThumb: number) => {
    if (Array.isArray(value)) {
      activeThumb === 0 ? setMinDistanceToPlaza(value[activeThumb]) : setMaxDistanceToPlaza(value[activeThumb]);
    }
  };

  const distanceToRoadHandler = (event: Event, value: number | Array<number>, activeThumb: number) => {
    if (Array.isArray(value)) {
      activeThumb === 0 ? setMinDistanceToRoad(value[activeThumb]) : setMaxDistanceToRoad(value[activeThumb]);
    }
  };
  const distanceToDistrictHandler = (event: Event, value: number | Array<number>, activeThumb: number) => {
    if (Array.isArray(value)) {
      activeThumb === 0 ? setMinDistanceToDistrict(value[activeThumb]) : setMaxDistanceToDistrict(value[activeThumb]);
    }
  };

  const resetAll = () => {
    setSelectedType(0);
    setIsDisableSize(true);
    setIsDisabledDistanceToPlaza(true);
    setIsDisabledDistanceToRoad(true);
    setIsDisabledDistanceToDistrict(true);
    setMaxSize(maxLandSize);
    setMinSize(1);
    setMinDistanceToRoad(1);
    setMaxDistanceToRoad(MAX_DISTANCE);
    setMinDistanceToPlaza(1);
    setMaxDistanceToPlaza(MAX_DISTANCE);
    setMinDistanceToDistrict(1);
    setMaxDistanceToDistrict(MAX_DISTANCE);
  };

  const onSubmit = () => {
    const obj: Partial<MoreFiltersType> = {
      type: landTypes[selectedType].title,
      size: {
        min: minSize,
        max: maxSize || maxLandSize,
      },
      distanceToRoad: {
        min: minDistanceToRoad,
        max: maxDistanceToRoad || MAX_DISTANCE,
      },
      distanceToDistrict: {
        min: minDistanceToDistrict,
        max: maxDistanceToDistrict || MAX_DISTANCE,
      },
      distanceToPlaza: {
        min: minDistanceToPlaza,
        max: maxDistanceToPlaza || MAX_DISTANCE,
      },
    };
    if (isDisableSize) delete obj['size'];
    if (isDisabledDistanceToDistrict) delete obj['distanceToDistrict'];
    if (isDisabledDistanceToRoad) delete obj['distanceToRoad'];
    if (isDisabledDistanceToPlaza) delete obj['distanceToPlaza'];

    handleSubmit(obj);
  };

  useEffect(() => {
    setMaxSize(maxLandSize);
  }, [maxLandSize]);

  return (
    <Modal width={540} handleClose={onCancel} {...modalProps}>
      <StyledTitle>More filters</StyledTitle>

      <StyledRoot>
        <StyledGrid container>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <StyledSubtitle>Type</StyledSubtitle>
            <Button
              disabled={typeof selectedType !== 'number'}
              btnSize="xsmall"
              onClick={() => setSelectedType(0)}
              variant="tertiary"
            >
              Clear
            </Button>
          </Grid>
          {landTypes.map((type) => (
            <CheckboxContainer key={type.value} onClick={() => typeHandler(type.value)} container>
              <Grid item>
                <RadioButton disabled checked={selectedType === type.value} />
              </Grid>
              <Grid container direction="column" alignItems="flex-start">
                <h1>{type.title}</h1>
                <p>{type.desc}</p>
              </Grid>
            </CheckboxContainer>
          ))}
        </StyledGrid>

        <StyledGrid>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <StyledSubtitle sx={isDisableSize ? { ...disabled } : {}}>
              Size <span>For Estates only (e.g 14 Lands)</span>
            </StyledSubtitle>
            <StyledSwitch
              disabled={selectedType !== 2}
              checked={!isDisableSize}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setIsDisableSize(!checked)}
            />
          </Grid>
          <Grid sx={isDisableSize ? { ...disabled } : {}}>
            <StyledSlider
              components={{
                Thumb: ThumbComponent,
              }}
              min={1}
              max={maxLandSize}
              onChange={sizeHandler}
              value={[minSize, maxSize]}
            />
            <Grid container>
              <Grid xs={4} item>
                <Typography textAlign="start">Min</Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= 0 && value <= maxSize && setMinSize(value);
                  }}
                  style={{ width: '100%' }}
                  value={minSize}
                />
              </Grid>
              <Grid xs={4} item></Grid>
              <Grid xs={4} item>
                <Typography textAlign="start">Max</Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= minSize && value <= maxLandSize && setMaxSize(value);
                  }}
                  style={{ width: '100%' }}
                  value={maxSize}
                />
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>

        <StyledGrid>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <StyledSubtitle sx={isDisabledDistanceToPlaza ? { ...disabled } : {}}>Distance to Plaza</StyledSubtitle>
            <StyledSwitch
              checked={!isDisabledDistanceToPlaza}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
                setIsDisabledDistanceToPlaza(!checked)
              }
            />
          </Grid>
          <Grid sx={isDisabledDistanceToPlaza ? { ...disabled } : {}}>
            <StyledSlider
              components={{
                Thumb: ThumbComponent,
              }}
              min={1}
              max={MAX_DISTANCE}
              onChange={distanceToPlazaHandler}
              value={[minDistanceToPlaza, maxDistanceToPlaza]}
            />
            <Grid container>
              <Grid xs={4} item>
                <Typography textAlign="start">Min</Typography>
                <Input
                  type="number"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= 0 && value <= maxDistanceToPlaza && setMinDistanceToPlaza(value);
                  }}
                  value={minDistanceToPlaza}
                />
              </Grid>
              <Grid xs={4} item></Grid>
              <Grid xs={4} item>
                <Typography textAlign="start">Max</Typography>
                <Input
                  type="number"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= minDistanceToPlaza && value <= MAX_DISTANCE && setMaxDistanceToPlaza(+e.target.value);
                  }}
                  value={maxDistanceToPlaza}
                />
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>

        <StyledGrid>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <StyledSubtitle sx={isDisabledDistanceToRoad ? { ...disabled } : {}}>Distance to Road</StyledSubtitle>
            <StyledSwitch
              checked={!isDisabledDistanceToRoad}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
                setIsDisabledDistanceToRoad(!checked)
              }
            />
          </Grid>
          <Grid sx={isDisabledDistanceToRoad ? { ...disabled } : {}}>
            <StyledSlider
              components={{
                Thumb: ThumbComponent,
              }}
              min={1}
              max={MAX_DISTANCE}
              onChange={distanceToRoadHandler}
              value={[minDistanceToRoad, maxDistanceToRoad]}
            />
            <Grid container>
              <Grid xs={4} item>
                <Typography textAlign="start">Min</Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= 0 && value <= maxDistanceToDistrict && setMinDistanceToRoad(value);
                  }}
                  style={{ width: '100%' }}
                  value={minDistanceToRoad}
                />
              </Grid>
              <Grid xs={4} item></Grid>
              <Grid xs={4} item>
                <Typography textAlign="start">Max</Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= minDistanceToRoad && value <= MAX_DISTANCE && setMaxDistanceToRoad(value);
                  }}
                  style={{ width: '100%' }}
                  value={maxDistanceToRoad}
                />
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>

        <StyledGrid>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <StyledSubtitle sx={isDisabledDistanceToDistrict ? { ...disabled } : {}}>
              Distance to District
            </StyledSubtitle>
            <StyledSwitch
              checked={!isDisabledDistanceToDistrict}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
                setIsDisabledDistanceToDistrict(!checked)
              }
            />
          </Grid>
          <Grid sx={isDisabledDistanceToDistrict ? { ...disabled } : {}}>
            <StyledSlider
              components={{
                Thumb: ThumbComponent,
              }}
              min={1}
              max={MAX_DISTANCE}
              onChange={distanceToDistrictHandler}
              value={[minDistanceToDistrict, maxDistanceToDistrict]}
            />
            <Grid container>
              <Grid xs={4} item>
                <Typography textAlign="start">Min</Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= 0 && value <= maxDistanceToDistrict && setMinDistanceToDistrict(value);
                  }}
                  style={{ width: '100%' }}
                  value={minDistanceToDistrict}
                />
              </Grid>
              <Grid xs={4} item></Grid>
              <Grid xs={4} item>
                <Typography textAlign="start">Max</Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= minDistanceToDistrict && value <= MAX_DISTANCE && setMaxDistanceToDistrict(value);
                  }}
                  style={{ width: '100%' }}
                  value={maxDistanceToDistrict}
                />
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>

        <ButtonRow container justifyContent="space-between">
          <Button onClick={resetAll} variant="tertiary">
            Clear all
          </Button>
          <Button onClick={onSubmit} btnSize="medium" variant="gradient">
            Save
          </Button>
        </ButtonRow>
      </StyledRoot>
    </Modal>
  );
};

type ThumbComponentProps = React.HTMLAttributes<unknown>;

function ThumbComponent(props: ThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </SliderThumb>
  );
}
