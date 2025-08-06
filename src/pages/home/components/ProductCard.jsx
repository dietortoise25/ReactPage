import LeftDecoration from "./LeftDecoration";

const ProductCard = ({ product }) => {
  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    const filename = imagePath.split("\\").pop();
    return `/${filename}`;
  };

  const renderSpecificationTable = () => {
    const specs = [];

    // 硬件规格映射
    const hardwareMapping = {
      chipset: "Chipset",
      heart_rate_sensor: "Heart Rate Sensor",
      screen: "Screen",
      screen_resolution: "Screen Resolution",
      battery_capacity: "Battery Capacity",
      waterproof_level: "Waterproof Level",
    };

    if (product.hardware_specifications) {
      Object.entries(product.hardware_specifications).forEach(
        ([key, value]) => {
          if (
            value &&
            value !== "Not available" &&
            value !== "N/A" &&
            value !== "" &&
            hardwareMapping[key]
          ) {
            specs.push({ label: hardwareMapping[key], value });
          }
        }
      );
    }

    // 连接功能映射
    const connectivityMapping = {
      bluetooth_call: "Bluetooth Call",
      bluetooth_version: "Bluetooth Version",
    };

    if (product.connectivity_features) {
      Object.entries(product.connectivity_features).forEach(([key, value]) => {
        if (
          value &&
          value !== "Not available" &&
          value !== "N/A" &&
          value !== "" &&
          connectivityMapping[key]
        ) {
          specs.push({ label: connectivityMapping[key], value });
        }
      });
    }

    // 使用时间映射
    const usageMapping = {
      charging_time: "Charging Time",
      normal_using_time: "Normal Using Time",
    };

    if (product.usage_time) {
      Object.entries(product.usage_time).forEach(([key, value]) => {
        if (
          value &&
          value !== "Not available" &&
          value !== "N/A" &&
          value !== "" &&
          usageMapping[key]
        ) {
          specs.push({ label: usageMapping[key], value });
        }
      });
    }

    // 颜色信息
    if (
      product.appearance?.colour &&
      product.appearance.colour !== "Not available"
    ) {
      specs.push({ label: "Colour", value: product.appearance.colour });
    }

    // 软件信息
    if (product.software?.app && product.software.app !== "Not available") {
      specs.push({ label: "APP", value: product.software.app });
    }

    return specs.map((spec, index) => (
      <tr
        key={index}
        className="border-b border-red-200/30"
      >
        <td className="py-2 px-3 text-sm font-medium text-white bg-red-500/90">
          {spec.label}
        </td>
        <td
          className={`py-2 px-3 text-sm text-gray-700 ${
            index % 2 === 0 ? "bg-white/80" : "bg-red-50/60"
          }`}
        >
          {spec.value}
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* 左侧装饰物 - 固定宽度 */}
      <div className="flex-shrink-0">
        <LeftDecoration />
      </div>

      {/* 右侧产品信息区域 - 灵活宽度 */}
      <div className="flex-1">
        {/* 顶部标识区域 */}
        <div className="bg-white text-red-600 p-4">
          <div className="flex flex-col space-y-4">
            <div className="w-full h-1 border-t-4 border-dashed border-red-600"></div>
            <span className="text-2xl font-bold text-left">
              {product.model || "zone_S01"}
            </span>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 产品图片 */}
            <div className="flex justify-center items-center">
              {product.white_background_image ? (
                <img
                  src={getImagePath(product.white_background_image)}
                  alt={`${product.model} Smart Watch`}
                  className="max-w-full max-h-64 object-contain"
                />
              ) : (
                <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            {/* 规格表格 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Specs</h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <tbody>{renderSpecificationTable()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
