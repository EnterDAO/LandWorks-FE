import React, { useEffect, useState } from 'react';
import { SliderThumb, Typography } from '@mui/material';

import { Button, Checkbox, Grid, Input, Modal, RadioButton, StyledSwitch } from 'design-system';
import { ModalProps } from 'design-system/Modal/Modal';

import {
  ButtonRow,
  CheckboxContainer,
  StyledGrid,
  StyledRoot,
  StyledSlider,
  StyledSubtitle,
  StyledTitle,
} from './styled';

import { voxelTypes } from 'modules/land-works/constants';

import { MoreFiltersType } from './types';

const disabled = {
  opacity: '0.5',
  pointerEvents: 'none',
};

type Props = Omit<ModalProps, 'handleClose'> & {
  handleSubmit: (value: Partial<MoreFiltersType>) => void;
  onCancel: () => void;
  maxHeight: number;
  maxArea: number;
};

export const VoxelFiltersModal: React.FC<Props> = (props) => {
  const MAX_VALUE = 9;
  const { onCancel, handleSubmit, ...modalProps } = props;
  const [selectedType, setSelectedType] = useState<number>(0);
  const [minArea, setMinArea] = useState<number>(1);
  const [maxArea, setMaxArea] = useState<number>(MAX_VALUE);
  const [minHeight, setMinHeight] = useState<number>(1);
  const [maxHeight, setMaxHeight] = useState<number>(MAX_VALUE);

  const [isDisabledArea, setIsDisabledArea] = useState(true);
  const [isDisabledHeight, setIsDisabledHeight] = useState(true);
  const [isDisabledAdditions, setIsDisabledAdditions] = useState(true);
  const [hasBasement, setHasBasement] = useState(false);
  const [isWaterFront, setIsWaterfront] = useState(false);

  const typeHandler = (value: number) => {
    setSelectedType(value);
  };

  const areaHandler = (event: Event, value: number | Array<number>, activeThumb: number) => {
    if (Array.isArray(value)) {
      if (activeThumb === 0) {
        setMinArea(value[activeThumb]);
      } else {
        setMaxArea(value[activeThumb]);
      }
    }
  };

  const heightHandler = (event: Event, value: number | Array<number>, activeThumb: number) => {
    if (Array.isArray(value)) {
      if (activeThumb === 0) {
        setMinHeight(value[activeThumb]);
      } else {
        setMaxHeight(value[activeThumb]);
      }
    }
  };

  const resetAll = () => {
    setSelectedType(0);
    setIsDisabledArea(true);
    setIsDisabledHeight(true);
    setIsDisabledAdditions(true);
    setMinArea(1);
    setMinHeight(1);
    setMaxArea(props.maxArea);
    setMaxHeight(props.maxHeight);
    setIsWaterfront(false);
    setHasBasement(false);
  };

  const onSubmit = () => {
    const obj: Partial<MoreFiltersType> = {
      type: voxelTypes[selectedType].title,
      area: {
        min: minArea || 1,
        max: maxArea || props.maxArea,
      },
      height: {
        min: minHeight || 1,
        max: maxHeight || props.maxHeight,
      },
      hasBasement,
      isWaterFront,
    };

    if (isDisabledArea) delete obj['area'];
    if (isDisabledHeight) delete obj['height'];
    if (!hasBasement || isDisabledAdditions) delete obj['hasBasement'];
    if (!isWaterFront || isDisabledAdditions) delete obj['isWaterFront'];

    handleSubmit(obj);
  };

  useEffect(() => {
    setMaxArea(props.maxArea);
    setMaxHeight(props.maxHeight);
  }, [props.maxHeight, props.maxArea]);

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
          {voxelTypes.map((type) => (
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
            <StyledSubtitle>Area</StyledSubtitle>
            <StyledSwitch
              checked={!isDisabledArea}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setIsDisabledArea(!checked)}
            />
          </Grid>
          <Grid sx={isDisabledArea ? { ...disabled } : {}}>
            <StyledSlider
              components={{
                Thumb: ThumbComponent,
              }}
              min={1}
              max={props.maxArea}
              onChange={areaHandler}
              value={[minArea, maxArea]}
            />
            <Grid container>
              <Grid xs={4} item>
                <Typography textAlign="start">Min</Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= 0 && value <= maxArea && setMinArea(value);
                  }}
                  style={{ width: '100%' }}
                  value={minArea}
                />
              </Grid>
              <Grid xs={4} item></Grid>
              <Grid xs={4} item>
                <Typography textAlign="start">Max</Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= minArea && value <= props.maxArea && setMaxArea(value);
                  }}
                  style={{ width: '100%' }}
                  value={maxArea}
                />
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>

        <StyledGrid>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <StyledSubtitle>Height</StyledSubtitle>
            <StyledSwitch
              checked={!isDisabledHeight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setIsDisabledHeight(!checked)}
            />
          </Grid>
          <Grid sx={isDisabledHeight ? { ...disabled } : {}}>
            <StyledSlider
              components={{
                Thumb: ThumbComponent,
              }}
              min={1}
              max={props.maxHeight}
              onChange={heightHandler}
              value={[minHeight, maxHeight]}
            />
            <Grid container>
              <Grid xs={4} item>
                <Typography textAlign="start">Min</Typography>
                <Input
                  type="number"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    const value = +e.target.value;
                    value >= 0 && value <= maxHeight && setMinHeight(value);
                  }}
                  value={minHeight}
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
                    value >= minHeight && value <= props.maxHeight && setMaxHeight(value);
                  }}
                  value={maxHeight}
                />
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>

        <StyledGrid>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <StyledSubtitle>Additions</StyledSubtitle>
            <StyledSwitch
              checked={!isDisabledAdditions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setIsDisabledAdditions(!checked)}
            />
          </Grid>
          <Grid container gap={5} mt={4} sx={isDisabledAdditions ? { ...disabled } : {}}>
            <Grid sx={{ cursor: 'pointer' }} onClick={() => setHasBasement(!hasBasement)}>
              <Checkbox checked={hasBasement} />
              <span>Has basement</span>
            </Grid>
            <Grid sx={{ cursor: 'pointer' }} onClick={() => setIsWaterfront(!isWaterFront)}>
              <Checkbox checked={isWaterFront} />
              Is waterfront
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
