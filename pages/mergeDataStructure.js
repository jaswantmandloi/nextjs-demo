import { useEffect, useRef, useState } from "react";
import styles from "../styles/MergeModule.module.css";
import {
  getMergedProductVariantsWithProductCodes,
  getData1,
  getData2,
  getCurrentSelectedVariantsByProductCode,
  getAvailableProductCodesWithCurrentSelection,
} from "../Shared/Utils/mergeDataStructure";

export default function App() {
  const [selectedProdctCode, setSelectedProdctCode] = useState("ACSPTM623BK");
  const [variantListWithProductCodes, setVariantListWithProductCodes] =
    useState([]);
  const [productVarientsMapping, setProductVarientsMapping] = useState({});

  useEffect(() => {
    const data = getData2();
    const [
      {
        Products: [{ ProductCode }],
      },
    ] = data;
    setSelectedProdctCode(ProductCode);

    const { variantListWithProductCodes, productVarientsMapping } =
      getMergedProductVariantsWithProductCodes(data);

    setVariantListWithProductCodes(variantListWithProductCodes);
    setProductVarientsMapping(productVarientsMapping);
  }, []);

  const handleSelectProduct = (productCode) => {
    setSelectedProdctCode(productCode);
  };

  const selectedVariants = getCurrentSelectedVariantsByProductCode(
    variantListWithProductCodes,
    selectedProdctCode
  );

  console.log({
    variantListWithProductCodes,
    productVarientsMapping,
    selectedVariants,
  });

  //return <div>Testing</div>;

  return (
    <div className={styles.App}>
      <h1>Data Merging While showing</h1>

      {variantListWithProductCodes.map((variantData, index) => {
        const { variantType, variants } = variantData;
        return (
          <div className={styles.variantRow} key={variantType}>
            {variantType}:
            <ul>
              {variants.map((variant) => {
                const { ProductCode, Description, productCodes } = variant;
                const selected = productCodes.includes(selectedProdctCode);

                // if (Description === "Yellow") {
                //   debugger;
                // }

                const availableProductCodes =
                  getAvailableProductCodesWithCurrentSelection({
                    selectedVariants,
                    productVarientsMapping,
                    currentItemProductCodes: productCodes,
                    currentItemIndex: index,
                  });

                const isAvailable = !!availableProductCodes.length;

                const style = selected
                  ? styles.selected
                  : isAvailable
                  ? styles.available
                  : styles.notAvailable;

                return (
                  <li className={style} key={Description}>
                    <button
                      onClick={() => {
                        const [selectingProductCode] =
                          availableProductCodes.length
                            ? availableProductCodes
                            : productCodes;

                        handleSelectProduct(selectingProductCode);
                      }}
                    >
                      {`${Description} ${ProductCode}`}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function RenderRow({
  label,
  onSelectProduct,
  selectedProdctCode,
  index,
  variants,
  productVarientsMapping,
}) {
  return (
    <div>
      {label}:
      <ul>
        {variants.map((variant) => {
          const { Description, productCodes } = variant;
          const selected = productCodes.includes(selectedProdctCode);

          //const isAvailable =

          const style = selected
            ? styles.selected
            : isAvailable
            ? styles.available
            : styles.notAvailable;

          return (
            <li className={style} key={Description}>
              <button
                onClick={() => {
                  const selectingProductCode =
                    productCodes.find((productCode) => {
                      return availableProductCodes.includes(productCode);
                    }) || productCode;
                  onSelectProduct(selectingProductCode, item);
                }}
              >
                {`${Description} ${ProductCode}`}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
