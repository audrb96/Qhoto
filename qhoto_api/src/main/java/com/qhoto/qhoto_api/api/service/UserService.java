package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.ExpRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ExpRepository expRepository;

}
