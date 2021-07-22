import { useEffect, useRef, useState } from "react";

import styles from "../styles/MergeModule.module.css";

// var sizes = [
//   { productCode: "1", desc: "1" },
//   { productCode: "2", desc: "1" },
//   { productCode: "3", desc: "2" },
//   { productCode: "4", desc: "2" },
//   { productCode: "5", desc: "2" },
//   { productCode: "6", desc: "3" }
// ];
// var colors = [
//   { productCode: "1", desc: "Red" },
//   { productCode: "2", desc: "Black" },
//   { productCode: "3", desc: "Red" },
//   { productCode: "4", desc: "Black" },
//   { productCode: "5", desc: "Yellow" },
//   { productCode: "6", desc: "Green" }
// ];

// var widths = [
//   { productCode: "1", desc: "11" },
//   { productCode: "2", desc: "22" },
//   { productCode: "3", desc: "33" },
//   { productCode: "4", desc: "33" },
//   { productCode: "5", desc: "22" },
//   { productCode: "6", desc: "11" }
// ];

var groupDescColors = {
  Red: [1],
  Black: [2],
  Green: [3],
  Blue: [4],
  Yellow: [5, 6],
};

var groupDescSizes = {
  "2x108": [1, 2, 3, 4, 5],
  "3x108": [6],
};

var groupIdSizes = {
  1: "2x108",
  2: "2x108",
  3: "2x108",
  4: "2x108",
  5: "2x108",
  6: "3x108",
};

var colors = [
  { productCode: "1", desc: "Red" },
  { productCode: "2", desc: "Black" },
  { productCode: "3", desc: "Green" },
  { productCode: "4", desc: "Blue" },
  { productCode: "5", desc: "Yellow" },
  { productCode: "6", desc: "Yellow" },
];

var sizes = [
  { productCode: "1", desc: "2x108" },
  { productCode: "2", desc: "2x108" },
  { productCode: "3", desc: "2x108" },
  { productCode: "4", desc: "2x108" },
  { productCode: "5", desc: "2x108" },
  { productCode: "6", desc: "3x108" },
];

var widths = [
  { productCode: "1", desc: "11 cm" },
  { productCode: "2", desc: "22 cm" },
  { productCode: "3", desc: "33 cm" },
  { productCode: "4", desc: "33 cm" },
  { productCode: "5", desc: "22 cm" },
  { productCode: "6", desc: "11 cm" },
];

const selectedProdctCode = "1";
const uniqueColors = getUniqueSelectedItems(colors, selectedProdctCode);
const uniqueSizes = getUniqueSelectedItems(sizes, selectedProdctCode);
const uniqueWidths = getUniqueSelectedItems(widths, selectedProdctCode);
connectAllItems([uniqueColors, uniqueSizes, uniqueWidths]);

export default function App() {
  const [selectedProdctCode, setSelectedProdctCode] = useState("1");
  const [availableProductsData, setAvailableProductData] = useState([]);
  const maxItemDataRef = useRef([]);
  const availableProductCodesRef = useRef([]);
  const itemsArray = [uniqueColors, uniqueSizes, uniqueWidths];
  const [firstItems] = itemsArray;

  useEffect(() => {
    if (!availableProductsData.length) {
      const lengths = itemsArray.map((items) => items.length);
      const index = lengths.indexOf(Math.max(...lengths));
      maxItemDataRef.current = itemsArray[index];
    }

    maxItemDataRef.current.forEach((item) => {
      const { productCodes } = item;
      if (productCodes.includes(selectedProdctCode)) {
        const availableProducts = productCodes.reduce((data, productCode) => {
          return [...data, ...item[productCode]];
        }, []);
        availableProductCodesRef.current = productCodes;
        setAvailableProductData(availableProducts);
      }
    });
  }, [selectedProdctCode]);

  const handleSelectProduct = (productCode, availableProducts) => {
    setSelectedProdctCode(productCode);
    //setAvailableProductData(availableProducts[productCode])
  };

  console.log('selectedProdctCode', selectedProdctCode)

  return (
    <div className={styles.App}>
      <h1>Data Merging While showing</h1>

      {itemsArray.map((items, index) => {
        return (
          <RenderRow
            key={index}
            label="Colors"
            items={items}
            onSelectProduct={handleSelectProduct}
            selectedProdctCode={selectedProdctCode}
            availableProductsData={availableProductsData}
            availableProductCodes={availableProductCodesRef.current}
          />
        );
      })}
    </div>
  );
}

function RenderRow({
  label,
  items,
  onSelectProduct,
  selectedProdctCode,
  availableProductsData,
  availableProductCodes,
}) {
  return (
    <div>
      {label}:
      <ul>
        {items.map((item) => {
          const { productCode, productCodes, desc } = item;
          const selected = productCodes.includes(selectedProdctCode);
          const isAvailable = availableProductsData.includes(desc);

          const style = selected
            ? styles.selected
            : isAvailable
            ? styles.available
            : styles.notAvailable;

          return (
            <li className={style} key={productCode}>
              <button
                onClick={() => {
                  const selectingProductCode =
                    productCodes.find((productCode) => {
                      return availableProductCodes.includes(productCode);
                    }) || productCode;
                  onSelectProduct(selectingProductCode, item);
                }}
              >
                {`${desc} ${productCode}`}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function getUniqueSelectedItems(items, selectedProductCode) {
  const mergedItems = {};
  items
    .map((item) => {
      return selectedProductCode === item.productCode
        ? { ...item, selected: true }
        : { ...item, selected: false };
    })
    .forEach((element) => {
      const { desc, productCode } = element;
      const previousElement = mergedItems[desc] ? mergedItems[desc] : null;
      const productCodes = previousElement
        ? [...previousElement.productCodes, productCode]
        : [productCode];
      mergedItems[desc] =
        previousElement && previousElement.selected
          ? { ...previousElement, productCodes }
          : { ...element, productCodes };
    });

  return Object.values(mergedItems);
}

function connectAllItems(itemsArray) {
  for (const itemsIndex in itemsArray) {
    const manipulatingItems = itemsArray[itemsIndex];
    const manipulatedByItems = [...itemsArray];
    manipulatedByItems.splice(itemsIndex, 1);
    manipulatingItems.forEach((manipulatingItem) => {
      const { productCodes } = manipulatingItem;
      manipulatedByItems.forEach((byItems) => {
        byItems.forEach((byItem) => {
          const { productCodes: byProductCodes, desc } = byItem;
          productCodes.forEach((productCode) => {
            if (byProductCodes.includes(productCode)) {
              const descs = Array.isArray(manipulatingItem[productCode])
                ? manipulatingItem[productCode]
                : [];
              manipulatingItem[String(productCode)] = [...descs, desc];
            }
          });
        });
      });
    });
  }
}

function isItemAvailable({ itemProductCodes, desc }, itemsArray) {
  let isAvailableArray = [];

  //console.log("itemsArray", itemsArray);

  itemsArray.forEach((items) => {
    items
      .filter((item) => item.selected)
      .forEach((item) => {
        //if (desc === "22 cm") console.log("item", { desc, item });
        const { productCodes } = item;
        productCodes.forEach((productCode) => {
          if (itemProductCodes.includes(productCode)) {
            isAvailableArray.push(true);
          }
        });
      });
  });

  if (desc === "22 cm") {
    console.log({
      isAvailableArray,
      itemsArray,
      itemProductCodes,
    });
  }

  return isAvailableArray.length === itemsArray.length;
}

/**
 .reduce((accumulated, item) => {
      let selectedItemIndex = null;

      for (const accumulatedItemIndex in accumulated) {
        const accumulatedItem = accumulated[accumulatedItemIndex];
        if (accumulatedItem.desc === item.desc) {
          selectedItemIndex = accumulatedItemIndex;
        }
      }

      if (selectedItemIndex === null) {
        return [...accumulated, item];
      } else if (item.selected) {
        accumulated[selectedItemIndex] = item;
        return accumulated;
      }

      return accumulated;
    }, []);
 */
