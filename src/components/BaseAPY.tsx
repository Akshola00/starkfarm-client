import React from 'react';
import { useAtomValue } from 'jotai';
import { StrkLendingIncentivesAtom } from '@/store/pools';
import { AtomWithQueryResult } from 'jotai-tanstack-query';
import { hashstack } from '@/store/hashstack.store';
import { LendingSpace } from '@/store/lending.base';

const PoolsInfoComponent = () => {
  const poolsData = useAtomValue(
    StrkLendingIncentivesAtom,
  ) as AtomWithQueryResult<LendingSpace.MyBaseAprDoc[], Error>;
  let poolInfoList;
  if (poolsData?.data) {
    console.log('POOLS DATA: ', poolsData.data);
    const incentiveDataKey = Object.keys(poolsData.data).find((key) =>
      key.includes('Hashstack'),
    );

    if (!incentiveDataKey) {
      throw new Error('Incentive Data Key not found in poolsData');
    }

    poolInfoList = hashstack._computePoolsInfo(poolsData.data);

    // poolInfoList.forEach((pool) => {
    //   console.log('Lopped POOL', pool);
    //   const protocol = {
    //     name: pool.protocol.name,
    //     link: pool.protocol.link,
    //     logo: pool.protocol.logo,
    //   };
    //   let poolName: string = pool.pool.name;
    //   console.log('POOL NAME: ', poolName);

    //   const commonVaultFilter = (poolName: string) =>
    //     ['USDC', 'USDT'].includes(poolName);

    //   console.log('Calling computePoolsInfo with:', {
    //     pool,
    //     incentiveDataKey,
    //     protocol,
    //     commonVaultFilter,
    //   });

    //   // computePoolsInfo returns an array, so we need to handle each pool
    //   const computedPools = LendingSpace.computePoolsInfo(
    //     pool,
    //     incentiveDataKey,
    //     protocol,
    //     commonVaultFilter,
    //   );
    //   // console.log('COMMON VAULT FILTER: ', commonVaultFilter);

    //   if (computedPools && computedPools.length > 0) {
    //     computedPools.forEach((computedPool) => {
    //       console.log('Processing computedPool:', computedPool);

    //       // Call getBaseAPY for each pool
    //       const baseApy = LendingSpace.getBaseAPY(computedPool, poolsData);
    //       console.log(
    //         'Base APY for pool:',
    //         computedPool.pool.name,
    //         ':',
    //         baseApy,
    //       );
    //     });
    //   } else {
    //     console.log('No computed pools returned');
    //   }
    // });
  }
  return (
    <div>
      <h2>Pools Information</h2>
      {poolInfoList?.map((pool, index) => (
        <div key={pool.pool.id} className="pool-card">
          <h3>Hello from apy</h3>
          <p>APR: {(pool.apr * 100).toFixed(2)}%</p>
          <p>TVL: ${pool.tvl.toLocaleString()}</p>
          <p>Category: {pool.category}</p>
        </div>
      ))}
      {/* {pools.map((pool) => (
        <div key={pool.pool.id} className="pool-card">
          <h3>{pool.pool.name}</h3>
          <p>APR: {(pool.apr * 100).toFixed(2)}%</p>
          <p>TVL: ${pool.tvl.toLocaleString()}</p>
          <p>Category: {pool.category}</p>
        </div>
      ))} */}
    </div>
  );
};

export default PoolsInfoComponent;
