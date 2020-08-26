import dynamic from "next/dynamic";

export default dynamic(() => import("./clientside-demo"), { ssr: false });

// import Loadable from "@loadable/component"

// export default Loadable(() => import("./clientside-demo"))
