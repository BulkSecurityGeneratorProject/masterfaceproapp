package com.mastertek.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TerminalService {

    private final Logger log = LoggerFactory.getLogger(TerminalService.class);

}