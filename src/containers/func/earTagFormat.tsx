import NumberFormat from 'react-number-format';
import * as React from 'react';

interface CustomProps {
  onChange: (event: { target: { value: string } }) => void;
  name: string;
}

const EarTagFormat = React.forwardRef<NumberFormat<number>, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        isNumericString
        format="####"
        placeholder="耳標番号"
        mask="*"
      />
    );
  },
);

export default EarTagFormat;
