
import rawData from "./response_clusters.json";

// 클러스터 배열
export const newsClusters = rawData.data.newsClusters;

// 낱개 뉴스 리스트 (NewsListPage에 사용)
export const flatNews = newsClusters.flatMap((cluster) =>
  cluster.ids.map((id, idx) => ({
    id,
    title: cluster.titles[idx],
    summary: cluster.summary.highlight,
    clusterId: cluster.cluster_id,
    generatedTitle: cluster.generated_title,
    keywords: cluster.generated_keywords,
    timestamp: cluster.timestamp,
  }))
);