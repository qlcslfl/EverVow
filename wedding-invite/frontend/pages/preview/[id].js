import dynamic from "next/dynamic";

const DynamicPreview = dynamic(() => import("./[id]_client"), { ssr: false });

export default DynamicPreview;
