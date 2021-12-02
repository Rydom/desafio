import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
class RepoService {
  public constructor(
    // @InjectRepository(User) public readonly userRepo: Repository<User>,
    // @InjectRepository(Post) public readonly postRepo: Repository<Post>,
  ) {}
}

export default RepoService;