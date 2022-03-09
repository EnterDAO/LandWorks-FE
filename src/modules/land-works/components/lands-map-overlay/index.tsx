import { ChipStyled, RootStyled, StackStyled, TypographyStyled } from './styled';

type Coordinate = {
  id: string;
  x: string;
  y: string;
};

interface IEstateLandOverlay {
  title: string;
  coordinates?: Coordinate[];
}

const LandsMapOverlay: React.FC<IEstateLandOverlay> = ({ title, coordinates }) => {
  return coordinates && coordinates?.length >= 1 ? (
    <RootStyled>
      <TypographyStyled variant="h3">{title}</TypographyStyled>

      <StackStyled>
        {coordinates.map((estateCoord: Coordinate) => (
          <ChipStyled key={estateCoord.id} label={`X: ${estateCoord.x}, Y: ${estateCoord.y}`} variant="outlined" />
        ))}
      </StackStyled>
    </RootStyled>
  ) : (
    <></>
  );
};

export default LandsMapOverlay;
