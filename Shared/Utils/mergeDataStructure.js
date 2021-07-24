export function getMergedProductVariantsWithProductCodes(variantList) {
  const productVarientsMapping = {};
  const variantListWithProductCodes = variantList.map(
    ({ VariantType, Products }) => {
      const mergedVariants = Products.reduce(
        (productsByDescription, product) => {
          const { Description, ProductCode } = product;
          const { productCodes = [] } =
            productsByDescription[Description] || {};
          const proudctToBeAdded = {
            ...product,
            productCodes: [...productCodes, ProductCode],
          };

          // Prepare product code and variants mapping
          const variants = productVarientsMapping[ProductCode]
            ? productVarientsMapping[ProductCode]
            : [];
          productVarientsMapping[ProductCode] = [...variants, Description];

          return { ...productsByDescription, [Description]: proudctToBeAdded };
        },
        {}
      );

      const mergedVariantsWithProductCodes = Object.values(mergedVariants);
      return {
        variantType: VariantType,
        variants: mergedVariantsWithProductCodes,
      };
    }
  );

  return { variantListWithProductCodes, productVarientsMapping };
}

export function getAvailableProductCodesWithCurrentSelection({
  selectedVariants,
  productVarientsMapping,
  currentItemProductCodes,
  currentItemIndex,
}) {
  const comparingSelectedVariants = selectedVariants.filter(
    (_, index) => currentItemIndex !== index
  );
  const availableProductCodes = currentItemProductCodes.filter(
    (currentItemProductCode) => {
      // Get variants by productCode
      const variantsByProductCode =
        productVarientsMapping[currentItemProductCode] || [];
      const availableVariants = variantsByProductCode.filter((item) =>
        comparingSelectedVariants.includes(item)
      );

      return comparingSelectedVariants.length === availableVariants.length;
    }
  );

  return availableProductCodes;
}

export function getCurrentSelectedVariantsByProductCode(
  variantListWithProductCodes,
  selectedProdctCode
) {
  return variantListWithProductCodes.map(({ variants }) => {
    const [{ Description = "" } = {}] = variants.filter(({ productCodes }) =>
      productCodes.includes(selectedProdctCode)
    );

    return Description;
  });
}

export function getData1() {
  const productData = [
    {
      VariantType: "Label Colour",
      Products: [
        {
          ProductCode: "ACSPTM623BK",
          Description: "Black",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623BN",
          Description: "Brown",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623BU",
          Description: "Blue",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623GN",
          Description: "Green",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623GY",
          Description: "Grey",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623OR",
          Description: "Orange",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623RD",
          Description: "Red",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623WT",
          Description: "White",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623YL",
          Description: "Yellow",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM633YL",
          Description: "Yellow",
          ProductImage: "",
        },
      ],
    },
    {
      VariantType: "Label Size",
      Products: [
        {
          ProductCode: "ACSPTM623BK",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623BN",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623BU",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623GN",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623GY",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623OR",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623RD",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623WT",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM623YL",
          Description: "2\" x 108'",
          ProductImage: "",
        },
        {
          ProductCode: "ACSPTM633YL",
          Description: "3\" x 108'",
          ProductImage: "",
        },
      ],
    },
  ];

  return productData;
}

export function getData2() {
  const productData = [
    {
      VariantType: "Label Colour",
      Products: [
        {
          ProductCode: "1",
          Description: "Red",
          ProductImage: "",
        },
        {
          ProductCode: "2",
          Description: "Black",
          ProductImage: "",
        },
        {
          ProductCode: "3",
          Description: "Green",
          ProductImage: "",
        },
        {
          ProductCode: "4",
          Description: "Blue",
          ProductImage: "",
        },
        {
          ProductCode: "5",
          Description: "Yellow",
          ProductImage: "",
        },
        {
          ProductCode: "6",
          Description: "Yellow",
          ProductImage: "",
        },
      ],
    },

    {
      VariantType: "Label Sizes",
      Products: [
        {
          ProductCode: "1",
          Description: "2x108",
          ProductImage: "",
        },
        {
          ProductCode: "2",
          Description: "2x108",
          ProductImage: "",
        },
        {
          ProductCode: "3",
          Description: "2x108",
          ProductImage: "",
        },
        {
          ProductCode: "4",
          Description: "2x108",
          ProductImage: "",
        },
        {
          ProductCode: "5",
          Description: "2x108",
          ProductImage: "",
        },
        {
          ProductCode: "6",
          Description: "3x108",
          ProductImage: "",
        },
      ],
    },

    {
      VariantType: "Label Widths",
      Products: [
        {
          ProductCode: "1",
          Description: "11 cm",
          ProductImage: "",
        },
        {
          ProductCode: "2",
          Description: "22 cm",
          ProductImage: "",
        },
        {
          ProductCode: "3",
          Description: "33 cm",
          ProductImage: "",
        },
        {
          ProductCode: "4",
          Description: "33 cm",
          ProductImage: "",
        },
        {
          ProductCode: "5",
          Description: "11 cm",
          ProductImage: "",
        },
        {
          ProductCode: "6",
          Description: "22 cm",
          ProductImage: "",
        },
      ],
    },
  ];

  return productData;
}

/** */

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
    //manipulatedByItems.splice(itemsIndex, 1);
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

function isItemAvailable({ productCodes, items, currentItemIndex }) {
  const restItems = items.filter((item, index) => index !== currentItemIndex);

  restItems
    .filter((item) => item.selected)
    .filter((item) => {
      const { productCodes } = item;
      productCodes.filter((productCode) => {
        return item[productCode];
      });
    });
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

//   useEffect(() => {
//     const uniqueColors = getUniqueSelectedItems(colors, selectedProdctCode);
//     const uniqueSizes = getUniqueSelectedItems(sizes, selectedProdctCode);
//     const uniqueWidths = getUniqueSelectedItems(widths, selectedProdctCode);
//     connectAllItems([uniqueColors, uniqueSizes, uniqueWidths]);

//     const itemsArray = [uniqueColors, uniqueSizes, uniqueWidths];
//     itemsArrayRef.current = itemsArray

//     if (!availableProductsData.length) {
//       const lengths = itemsArray.map((items) => items.length);
//       const index = lengths.indexOf(Math.max(...lengths));
//       maxItemDataRef.current = itemsArray[index];
//     }

//     maxItemDataRef.current.forEach((item) => {
//       const { productCodes } = item;
//       if (productCodes.includes(selectedProdctCode)) {
//         const availableProducts = productCodes.reduce((data, productCode) => {
//           return [...data, ...item[productCode]];
//         }, []);
//         availableProductCodesRef.current = productCodes;
//         setAvailableProductData(availableProducts);
//       }
//     });
//   }, [selectedProdctCode]);
