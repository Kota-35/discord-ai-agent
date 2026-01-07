import { ok } from 'neverthrow';
import { searchGourmet } from '@/libs/hotpepperGourmet/gourmetSearch';

searchGourmet({
  keyword: 'ラーメン',
})
  .andThen((data) => {
    console.info(data);
    // Return an Ok result to satisfy the andThen contract
    return ok(data);
  })
  .mapErr((error) => {
    console.error(error);
  });
