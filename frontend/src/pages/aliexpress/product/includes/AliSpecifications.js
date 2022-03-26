import React from 'react';
import { getProductAttributes, getProductGroupedAttributes } from "../../../../utils/CartHelpers";
import { isArray } from "lodash";

const AliSpecifications = ({ specsModule }) => {

  const specifications = specsModule?.props;

  return (
    <div className="product-desc-content">
      <table className="table text-center table-bordered">
        <tbody>
          {
            isArray(specifications) &&
            specifications.map((spec, kec) =>
              <tr key={kec}>
                <th className="bg-gray"><b>{spec.attrName}</b></th>
                <td >{spec.attrValue}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default AliSpecifications;